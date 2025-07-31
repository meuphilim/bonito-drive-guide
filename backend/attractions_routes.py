from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from models import (
    Attraction, 
    AttractionCreate, 
    AttractionUpdate, 
    AttractionFilter,
    UserFavorite,
    UserFavoriteCreate,
    AttractionStats
)
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime
import re

router = APIRouter(prefix="/api/attractions", tags=["attractions"])

# Get database connection
def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    return db

@router.get("/", response_model=List[Attraction])
async def get_attractions(
    category: Optional[str] = Query(None, description="Filter by category"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty"),
    rating_min: Optional[float] = Query(None, ge=0, le=5, description="Minimum rating"),
    rating_max: Optional[float] = Query(None, ge=0, le=5, description="Maximum rating"),
    search: Optional[str] = Query(None, description="Search in name and description"),
    limit: int = Query(50, ge=1, le=100, description="Number of results"),
    skip: int = Query(0, ge=0, description="Number of results to skip"),
):
    """Get all attractions with optional filtering"""
    db = get_database()
    
    # Build filter query
    filter_query = {"is_active": True}
    
    if category:
        filter_query["category"] = category
    
    if difficulty:
        filter_query["difficulty"] = difficulty
    
    if rating_min is not None:
        filter_query.setdefault("rating", {})["$gte"] = rating_min
    
    if rating_max is not None:
        filter_query.setdefault("rating", {})["$lte"] = rating_max
    
    if search:
        # Case-insensitive search in name and description
        regex = re.compile(search, re.IGNORECASE)
        filter_query["$or"] = [
            {"name": {"$regex": regex}},
            {"description": {"$regex": regex}},
            {"full_description": {"$regex": regex}}
        ]
    
    # Execute query
    cursor = db.attractions.find(filter_query).skip(skip).limit(limit)
    attractions = await cursor.to_list(length=limit)
    
    # Convert field names for Pydantic compatibility
    for attraction in attractions:
        if 'full_description' in attraction:
            attraction['fullDescription'] = attraction.pop('full_description')
    
    return [Attraction(**attraction) for attraction in attractions]

@router.get("/categories")
async def get_categories():
    """Get all available categories"""
    db = get_database()
    
    categories = await db.attractions.distinct("category", {"is_active": True})
    return {"categories": categories}

@router.get("/difficulties")
async def get_difficulties():
    """Get all available difficulty levels"""
    db = get_database()
    
    difficulties = await db.attractions.distinct("difficulty", {"is_active": True})
    return {"difficulties": difficulties}

@router.get("/stats", response_model=AttractionStats)
async def get_stats():
    """Get attraction statistics"""
    db = get_database()
    
    # Total attractions
    total = await db.attractions.count_documents({"is_active": True})
    
    # By category
    category_pipeline = [
        {"$match": {"is_active": True}},
        {"$group": {"_id": "$category", "count": {"$sum": 1}}}
    ]
    category_stats = {}
    async for doc in db.attractions.aggregate(category_pipeline):
        category_stats[doc["_id"]] = doc["count"]
    
    # By difficulty
    difficulty_pipeline = [
        {"$match": {"is_active": True}},
        {"$group": {"_id": "$difficulty", "count": {"$sum": 1}}}
    ]
    difficulty_stats = {}
    async for doc in db.attractions.aggregate(difficulty_pipeline):
        difficulty_stats[doc["_id"]] = doc["count"]
    
    # Average rating
    avg_pipeline = [
        {"$match": {"is_active": True}},
        {"$group": {"_id": None, "avg_rating": {"$avg": "$rating"}}}
    ]
    avg_result = await db.attractions.aggregate(avg_pipeline).to_list(1)
    avg_rating = avg_result[0]["avg_rating"] if avg_result else 0
    
    # Most popular (highest rated)
    popular_cursor = db.attractions.find(
        {"is_active": True}
    ).sort("rating", -1).limit(5)
    popular_attractions = await popular_cursor.to_list(5)
    most_popular = [attr["name"] for attr in popular_attractions]
    
    return AttractionStats(
        total_attractions=total,
        by_category=category_stats,
        by_difficulty=difficulty_stats,
        average_rating=round(avg_rating, 2),
        most_popular=most_popular
    )

@router.get("/{attraction_id}", response_model=Attraction)
async def get_attraction(attraction_id: str):
    """Get a specific attraction by ID"""
    db = get_database()
    
    attraction = await db.attractions.find_one({
        "id": attraction_id,
        "is_active": True
    })
    
    if not attraction:
        raise HTTPException(status_code=404, detail="Attraction not found")
    
    return Attraction(**attraction)

@router.post("/", response_model=Attraction)
async def create_attraction(attraction: AttractionCreate):
    """Create a new attraction"""
    db = get_database()
    
    # Convert to Attraction model
    attraction_data = attraction.dict(by_alias=True)
    new_attraction = Attraction(**attraction_data)
    
    # Insert to database
    result = await db.attractions.insert_one(new_attraction.dict(by_alias=True))
    
    if not result.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to create attraction")
    
    return new_attraction

@router.put("/{attraction_id}", response_model=Attraction)
async def update_attraction(attraction_id: str, attraction_update: AttractionUpdate):
    """Update an existing attraction"""
    db = get_database()
    
    # Check if attraction exists
    existing = await db.attractions.find_one({
        "id": attraction_id,
        "is_active": True
    })
    
    if not existing:
        raise HTTPException(status_code=404, detail="Attraction not found")
    
    # Update fields
    update_data = attraction_update.dict(exclude_unset=True, by_alias=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.attractions.update_one(
        {"id": attraction_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to update attraction")
    
    # Return updated attraction
    updated = await db.attractions.find_one({"id": attraction_id})
    return Attraction(**updated)

@router.delete("/{attraction_id}")
async def delete_attraction(attraction_id: str):
    """Soft delete an attraction (set is_active to False)"""
    db = get_database()
    
    result = await db.attractions.update_one(
        {"id": attraction_id, "is_active": True},
        {"$set": {"is_active": False, "updated_at": datetime.utcnow()}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Attraction not found")
    
    return {"message": "Attraction deleted successfully"}

# Favorites endpoints
@router.post("/favorites", response_model=UserFavorite)
async def add_favorite(favorite: UserFavoriteCreate):
    """Add attraction to user favorites"""
    db = get_database()
    
    # Check if attraction exists
    attraction = await db.attractions.find_one({
        "id": favorite.attraction_id,
        "is_active": True
    })
    
    if not attraction:
        raise HTTPException(status_code=404, detail="Attraction not found")
    
    # Check if already favorited
    existing = await db.favorites.find_one({
        "user_id": favorite.user_id,
        "attraction_id": favorite.attraction_id
    })
    
    if existing:
        raise HTTPException(status_code=400, detail="Already in favorites")
    
    # Create favorite
    new_favorite = UserFavorite(**favorite.dict())
    result = await db.favorites.insert_one(new_favorite.dict())
    
    if not result.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to add favorite")
    
    return new_favorite

@router.get("/favorites/{user_id}", response_model=List[Attraction])
async def get_user_favorites(user_id: str):
    """Get user's favorite attractions"""
    db = get_database()
    
    # Get favorite attraction IDs
    favorites_cursor = db.favorites.find({"user_id": user_id})
    favorites = await favorites_cursor.to_list(1000)
    attraction_ids = [fav["attraction_id"] for fav in favorites]
    
    if not attraction_ids:
        return []
    
    # Get attractions
    attractions_cursor = db.attractions.find({
        "id": {"$in": attraction_ids},
        "is_active": True
    })
    attractions = await attractions_cursor.to_list(1000)
    
    return [Attraction(**attraction) for attraction in attractions]

@router.delete("/favorites/{user_id}/{attraction_id}")
async def remove_favorite(user_id: str, attraction_id: str):
    """Remove attraction from user favorites"""
    db = get_database()
    
    result = await db.favorites.delete_one({
        "user_id": user_id,
        "attraction_id": attraction_id
    })
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Favorite not found")
    
    return {"message": "Favorite removed successfully"}

@router.get("/nearby/{lat}/{lon}")
async def get_nearby_attractions(
    lat: float,
    lon: float,
    radius_km: float = Query(50, description="Search radius in kilometers"),
    limit: int = Query(10, ge=1, le=50)
):
    """Get attractions near a location (simplified distance calculation)"""
    db = get_database()
    
    # Get all attractions
    attractions = await db.attractions.find({"is_active": True}).to_list(1000)
    
    # Calculate distances (simplified Haversine)
    nearby_attractions = []
    for attraction in attractions:
        coords = attraction.get("coordinates", "").split(",")
        if len(coords) == 2:
            try:
                attr_lat = float(coords[0].strip())
                attr_lon = float(coords[1].strip())
                
                # Simplified distance calculation
                lat_diff = lat - attr_lat
                lon_diff = lon - attr_lon
                distance = (lat_diff ** 2 + lon_diff ** 2) ** 0.5 * 111  # Rough km conversion
                
                if distance <= radius_km:
                    attraction["calculated_distance"] = round(distance, 2)
                    nearby_attractions.append(attraction)
            except:
                continue
    
    # Sort by distance and limit
    nearby_attractions.sort(key=lambda x: x.get("calculated_distance", float("inf")))
    nearby_attractions = nearby_attractions[:limit]
    
    return [Attraction(**attraction) for attraction in nearby_attractions]