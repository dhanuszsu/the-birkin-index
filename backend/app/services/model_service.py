from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
import json

from app.models.record import AuctionRecord
from app.models.model_metadata import ModelMetadata
from app.schemas.model import ModelStatusResponse

class ModelService:
    @staticmethod
    def get_model_status(db: Session) -> ModelStatusResponse:
        total_records = db.query(AuctionRecord).count()
        genuine_research = db.query(AuctionRecord).filter(
            AuctionRecord.record_category == "research_dataset",
            AuctionRecord.is_illustrative == False,
            AuctionRecord.verification_status == "VERIFIED"
        ).count()
        
        eligible_for_ml = db.query(AuctionRecord).filter(
            AuctionRecord.eligible_for_ml == True
        ).count()
        
        # Check active model metadata in DB
        active_model = db.query(ModelMetadata).filter(
            ModelMetadata.is_active == True,
            ModelMetadata.status == "active"
        ).first()
        
        if active_model and eligible_for_ml >= 50:
            metrics: Optional[Dict[str, Any]] = {
                "mae": active_model.mae,
                "rmse": active_model.rmse,
                "r2": active_model.r2,
                "sample_size": active_model.sample_size,
            }
            return ModelStatusResponse(
                is_available=True,
                status="active",
                reason="Calibrated hedonic regression model is active and validated on verified research data.",
                active_model_name=active_model.model_name,
                active_model_version=active_model.version,
                total_records=total_records,
                genuine_research_records=genuine_research,
                eligible_for_ml_count=eligible_for_ml,
                minimum_records_required=50,
                model_metrics=metrics,
            )
            
        return ModelStatusResponse(
            is_available=False,
            status="unavailable",
            reason=(
                "No validated machine learning models have been trained on verified research records. "
                "The system strictly prohibits training on illustrative demonstration records or speculative asking prices."
            ),
            active_model_name=None,
            active_model_version=None,
            total_records=total_records,
            genuine_research_records=genuine_research,
            eligible_for_ml_count=eligible_for_ml,
            minimum_records_required=50,
            model_metrics=None,
        )
