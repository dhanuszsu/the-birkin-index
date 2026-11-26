from pydantic import BaseModel, Field
from typing import Optional, List

class ValuationPredictRequest(BaseModel):
    model: str = Field(..., description="e.g. 'Birkin 25 Retourne'")
    size: str = Field(..., description="e.g. '25'")
    leather: str = Field(..., description="e.g. 'Togo'")
    color: str = Field(..., description="e.g. 'Noir (89)'")
    hardware: str = Field(..., description="e.g. 'Gold (GHW)'")
    condition: str = Field(..., description="e.g. 'Store Fresh / Pristine'")
    production_year: Optional[str] = None
    blind_stamp: Optional[str] = None
    accessories: Optional[List[str]] = Field(default_factory=list)
    documentation: Optional[List[str]] = Field(default_factory=list)
    currency: Optional[str] = "EUR"

class ValuationPredictResponse(BaseModel):
    status: str
    estimated_price_min: Optional[float] = None
    estimated_price_max: Optional[float] = None
    estimated_price_point: Optional[float] = None
    currency: str
    confidence_score: Optional[float] = None
    model_version: Optional[str] = None
    price_basis: Optional[str] = None
    explanation: str
