from pydantic import BaseModel
from typing import Optional, Dict, Any

class ModelStatusResponse(BaseModel):
    is_available: bool
    status: str
    reason: str
    active_model_name: Optional[str] = None
    active_model_version: Optional[str] = None
    total_records: int
    genuine_research_records: int
    eligible_for_ml_count: int
    minimum_records_required: int = 50
    model_metrics: Optional[Dict[str, Any]] = None
