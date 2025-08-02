from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class Attraction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    image: str
    photos: List[str]
    duration: str
    activities: List[str]
    difficulty: str  # "Fácil" | "Moderado" | "Difícil"
    rating: float
    description: str
    distance: str
    coordinates: str
    full_description: str = Field(alias="fullDescription")
    curiosities: List[str]
    tips: List[str]
    category: str  # "Gruta" | "Rio" | "Cachoeira" | "Ecoturismo" | "Aventura" | "Balneário" | "Mergulho"
    price: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

    class Config:
        allow_population_by_field_name = True

class AttractionCreate(BaseModel):
    name: str
    image: str
    photos: List[str] = []
    duration: str
    activities: List[str] = []
    difficulty: str
    rating: float = Field(ge=0, le=5)
    description: str
    distance: str
    coordinates: str
    full_description: str = Field(alias="fullDescription")
    curiosities: List[str] = []
    tips: List[str] = []
    category: str
    price: str

class AttractionUpdate(BaseModel):
    name: Optional[str] = None
    image: Optional[str] = None
    photos: Optional[List[str]] = None
    duration: Optional[str] = None
    activities: Optional[List[str]] = None
    difficulty: Optional[str] = None
    rating: Optional[float] = Field(None, ge=0, le=5)
    description: Optional[str] = None
    distance: Optional[str] = None
    coordinates: Optional[str] = None
    full_description: Optional[str] = Field(None, alias="fullDescription")
    curiosities: Optional[List[str]] = None
    tips: Optional[List[str]] = None
    category: Optional[str] = None
    price: Optional[str] = None
    is_active: Optional[bool] = None

class AttractionFilter(BaseModel):
    category: Optional[str] = None
    difficulty: Optional[str] = None
    rating_min: Optional[float] = Field(None, ge=0, le=5)
    rating_max: Optional[float] = Field(None, ge=0, le=5)
    price_max: Optional[float] = None
    search: Optional[str] = None
    limit: int = Field(50, ge=1, le=100)
    skip: int = Field(0, ge=0)

class UserFavorite(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str  # For future user authentication
    attraction_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserFavoriteCreate(BaseModel):
    user_id: str
    attraction_id: str

class AttractionStats(BaseModel):
    total_attractions: int
    by_category: dict
    by_difficulty: dict
    average_rating: float
    most_popular: List[str]