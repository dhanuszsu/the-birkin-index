from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.valuation import ValuationPredictRequest, ValuationPredictResponse
from app.services.valuation_service import ValuationService

router = APIRouter()

@router.post("/predict", response_model=ValuationPredictResponse, summary="Execute Predictive Valuation Estimation")
def predict_valuation(request: ValuationPredictRequest, db: Session = Depends(get_db)):
    return ValuationService.predict_valuation(db=db, request=request)
