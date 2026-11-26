from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.model import ModelStatusResponse
from app.services.model_service import ModelService

router = APIRouter()

@router.get("/status", response_model=ModelStatusResponse, summary="Get Machine Learning Model Availability & Health")
def get_model_status(db: Session = Depends(get_db)):
    return ModelService.get_model_status(db=db)
