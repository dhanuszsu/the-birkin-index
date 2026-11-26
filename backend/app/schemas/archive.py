from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, List
from datetime import datetime

class AuctionRecordBase(BaseModel):
    model: str = Field(..., description="Hermès Birkin Model, e.g. 'Birkin 25 Retourne'")
    size: str = Field(..., description="Proportion scale, e.g. '25', '30', '35', '40'")
    leather: str = Field(..., description="Leather or skin type, e.g. 'Togo', 'Epsom'")
    color: str = Field(..., description="Color name and code, e.g. 'Noir (89)'")
    hardware: str = Field(..., description="Hardware finish, e.g. 'Gold (GHW)'")
    condition: str = Field(..., description="Preservation grade, e.g. 'Store Fresh / Pristine'")
    production_year: Optional[str] = None
    blind_stamp: Optional[str] = None
    
    transaction_type: str = Field(..., description="'completed_sale', 'asking_price', or 'auction_estimate'")
    price_basis: str = Field(..., description="'Hammer price', 'Price including buyer\\'s premium', 'Dealer asking price', or 'Auction estimate'")
    original_price: float = Field(..., gt=0, description="Nominal transaction amount in native currency")
    original_currency: str = Field(..., description="Currency ISO code: 'EUR', 'USD', 'GBP', 'HKD', 'INR'")
    price_in_inr: float = Field(..., gt=0, description="Standardized reference amount in INR")
    transaction_date: Optional[str] = Field(None, description="ISO format 'YYYY-MM-DD'")
    
    source_id: Optional[str] = None
    source_name: str
    source_reference: str
    source_url: Optional[str] = None
    
    verification_status: str = Field(default="UNVERIFIED", description="'VERIFIED', 'PARTIALLY VERIFIED', or 'UNVERIFIED'")
    verification_notes: Optional[str] = None
    eligible_for_ml: bool = Field(default=False)
    is_illustrative: bool = Field(default=True)
    record_category: str = Field(default="illustrative_display", description="'illustrative_display' or 'research_dataset'")
    
    accessories: Optional[str] = None
    provenance: Optional[str] = None
    notes: Optional[str] = None

class AuctionRecordCreate(AuctionRecordBase):
    id: Optional[str] = None

class AuctionRecordResponse(AuctionRecordBase):
    id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}

class PaginatedArchiveResponse(BaseModel):
    total: int
    page: int
    page_size: int
    total_pages: int
    has_next: bool
    has_prev: bool
    records: List[AuctionRecordResponse]

