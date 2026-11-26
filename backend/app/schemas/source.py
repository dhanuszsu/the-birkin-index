from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class DataSourceBase(BaseModel):
    name: str = Field(..., description="Organization or Catalogue Name")
    source_type: str = Field(..., description="'auction_house', 'specialist_dealer', or 'curatorial_archive'")
    website_url: Optional[str] = None
    reliability_tier: str = Field(default="Tier 1 - Public Live Auction")
    is_active: bool = True

class DataSourceCreate(DataSourceBase):
    id: str

class DataSourceResponse(DataSourceBase):
    id: str
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}

