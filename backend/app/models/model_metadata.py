from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text
from datetime import datetime
from app.database.session import Base

class ModelMetadata(Base):
    __tablename__ = "model_metadata"
    
    id = Column(String, primary_key=True, index=True)
    model_name = Column(String, nullable=False)
    version = Column(String, nullable=False)
    algorithm = Column(String, nullable=False)                   # e.g. "RandomForestRegressor", "Ridge"
    status = Column(String, nullable=False, default="unavailable") # unavailable, trained, validated, active, deprecated
    trained_at = Column(DateTime, nullable=True)
    sample_size = Column(Integer, default=0)
    target_currency = Column(String, default="USD")
    target_price_definition = Column(String, default="Price including buyer's premium (USD)")
    
    # Validation Metrics
    mae = Column(Float, nullable=True)
    rmse = Column(Float, nullable=True)
    r2 = Column(Float, nullable=True)
    
    hyperparameters_json = Column(Text, nullable=True)
    features_json = Column(Text, nullable=True)
    artifact_path = Column(String, nullable=True)
    is_active = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
