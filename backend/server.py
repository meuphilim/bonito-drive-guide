from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

# Import attraction routes
from attractions_routes import router as attractions_router

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(
    title="Ecoexpedições API",
    description="API para guia turístico de Bonito, MS - PWA Android Auto",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models for backwards compatibility
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add legacy routes to the router
@api_router.get("/")
async def root():
    return {
        "message": "Ecoexpedições API",
        "version": "1.0.0",
        "endpoints": [
            "/api/attractions - Tourist attractions",
            "/api/status - System status",
            "/api/docs - API documentation"
        ]
    }

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.get("/health")
async def health_check():
    """Health check endpoint for PWA and monitoring"""
    try:
        # Test database connection
        await client.admin.command('ping')
        return {
            "status": "healthy",
            "timestamp": datetime.utcnow(),
            "database": "connected",
            "version": "1.0.0"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "timestamp": datetime.utcnow(),
            "database": "disconnected",
            "error": str(e)
        }

# Include the main API router
app.include_router(api_router)

# Include attractions routes
app.include_router(attractions_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize database and populate with sample data if empty"""
    logger.info("Starting up Ecoexpedições API...")
    
    # Check if attractions collection exists and has data
    attractions_count = await db.attractions.count_documents({})
    
    if attractions_count == 0:
        logger.info("Populating database with initial attractions data...")
        await populate_initial_data()

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

async def populate_initial_data():
    """Populate database with initial attractions data"""
    from data.initial_attractions import get_initial_attractions
    
    try:
        attractions_data = get_initial_attractions()
        if attractions_data:
            result = await db.attractions.insert_many(attractions_data)
            logger.info(f"Inserted {len(result.inserted_ids)} attractions")
        else:
            logger.warning("No initial attractions data found")
    except Exception as e:
        logger.error(f"Error populating initial data: {e}")
        # Continue startup even if population fails
