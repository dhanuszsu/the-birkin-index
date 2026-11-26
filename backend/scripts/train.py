"""
Model training CLI script for The Birkin Index.

Strict Data Integrity Rules:
- Only genuine, verified completed auction sales are eligible for ML training.
- Illustrative/demonstration records, dealer asking prices, and pre-sale auction estimates are quarantined.
- Training requires a minimum empirical sample size (threshold >= 50 verified records).
- If threshold is not met, the script securely logs an uncalibrated status and exits without producing pseudo-scientific predictions.
"""
import sys
import os
import json
import logging
from pathlib import Path
from datetime import datetime
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split

import uuid

# Setup paths
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from app.core.config import settings
from app.database.session import SessionLocal
from app.models.model_metadata import ModelMetadata
from ml.preprocessing.transformer import BirkinFeatureTransformer
from ml.training.models import train_and_evaluate_suite

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("train")

MINIMUM_TRAINING_RECORDS = 50


def train():
    training_file = settings.TRAINING_DIR / "ml_training_eligible.csv"
    artifacts_dir = settings.ARTIFACTS_DIR
    artifacts_dir.mkdir(parents=True, exist_ok=True)
    registry_file = artifacts_dir / "model_registry.json"

    logger.info("=======================================================")
    logger.info("THE BIRKIN INDEX — VALUATION MODEL TRAINING PIPELINE")
    logger.info(f"Target dataset: {training_file}")
    logger.info("=======================================================")

    df = pd.DataFrame()
    if training_file.exists():
        try:
            df = pd.read_csv(training_file)
        except Exception as e:
            logger.warning(f"Could not read training CSV: {e}")

    # Enforce strict quarantine filter: ensure no illustrative records are present
    if not df.empty and "is_illustrative" in df.columns:
        df = df[df["is_illustrative"] == False]
    if not df.empty and "eligible_for_ml" in df.columns:
        df = df[df["eligible_for_ml"] == True]

    record_count = len(df)
    logger.info(f"Eligible verified research records available: {record_count}")

    if record_count < MINIMUM_TRAINING_RECORDS:
        reason = (
            f"Insufficient verified ML-eligible records ({record_count} found, minimum {MINIMUM_TRAINING_RECORDS} required). "
            f"Illustrative records, dealer asking prices, and auction estimates are strictly quarantined from training. "
            f"Predictive model generation halted to maintain statistical and econometric integrity."
        )
        logger.warning(f"TRAINING REFUSED: {reason}")

        # Update registry JSON
        registry_data = {
            "is_available": False,
            "status": "unavailable",
            "model_type": "none",
            "model_version": "0.0.0",
            "trained_at": None,
            "sample_size": record_count,
            "minimum_required": MINIMUM_TRAINING_RECORDS,
            "metrics": {},
            "refusal_reason": reason,
            "last_evaluated": datetime.utcnow().isoformat()
        }
        with open(registry_file, "w", encoding="utf-8") as f:
            json.dump(registry_data, f, indent=2)

        # Update database metadata record
        db = SessionLocal()
        try:
            active_meta = db.query(ModelMetadata).filter(ModelMetadata.is_active == True).first()
            if not active_meta:
                meta = ModelMetadata(
                    id=f"meta_{uuid.uuid4().hex[:8]}",
                    model_name="Birkin Valuation Suite",
                    version="0.0.0",
                    algorithm="none",
                    trained_at=None,
                    sample_size=record_count,
                    mae=None,
                    rmse=None,
                    r2=None,
                    is_active=False,
                    status="unavailable"
                )
                db.add(meta)
            else:
                active_meta.is_active = False
                active_meta.status = "unavailable"
                active_meta.sample_size = record_count
            db.commit()
            logger.info("Updated database ModelMetadata: status='unavailable'")
        finally:
            db.close()

        logger.info(f"Updated registry file: {registry_file}")
        return

    # If count >= MINIMUM_TRAINING_RECORDS, run full training
    logger.info("Sufficient verified dataset available. Initiating training suite...")
    
    # Feature transformation
    transformer = BirkinFeatureTransformer()
    X = transformer.fit_transform(df)
    y = df["price_usd"].values

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    results, best_name, best_estimator = train_and_evaluate_suite(
        X_train, y_train, X_test, y_test
    )

    best_metrics = results[best_name]["metrics"]
    logger.info(f"Model comparison complete. Best estimator: {best_name}")
    logger.info(f"Evaluation metrics: RMSE=${best_metrics['rmse']:,.2f}, MAE=${best_metrics['mae']:,.2f}, R2={best_metrics['r2']}")

    version = f"1.0.{int(datetime.utcnow().timestamp())}"
    model_filename = f"model_{best_name}_{version}.joblib"
    transformer_filename = f"transformer_{version}.joblib"

    joblib.dump(best_estimator, artifacts_dir / model_filename)
    joblib.dump(transformer, artifacts_dir / transformer_filename)

    registry_data = {
        "is_available": True,
        "status": "active",
        "model_type": best_name,
        "model_version": version,
        "model_file": model_filename,
        "transformer_file": transformer_filename,
        "trained_at": datetime.utcnow().isoformat(),
        "sample_size": record_count,
        "metrics": best_metrics,
        "all_model_results": {k: v["metrics"] for k, v in results.items()}
    }

    with open(registry_file, "w", encoding="utf-8") as f:
        json.dump(registry_data, f, indent=2)

    db = SessionLocal()
    try:
        # Deactivate existing
        db.query(ModelMetadata).update({ModelMetadata.is_active: False})
        meta = ModelMetadata(
            id=f"meta_{uuid.uuid4().hex[:8]}",
            model_name="Birkin Valuation Suite",
            version=version,
            algorithm=best_name,
            trained_at=datetime.utcnow(),
            sample_size=record_count,
            mae=best_metrics["mae"],
            rmse=best_metrics["rmse"],
            r2=best_metrics["r2"],
            artifact_path=str(artifacts_dir / model_filename),
            features_json=json.dumps(transformer.get_feature_names()),
            hyperparameters_json=json.dumps(best_estimator.get_params()),
            is_active=True,
            status="active"
        )
        db.add(meta)
        db.commit()
    finally:
        db.close()

    logger.info(f"Saved artifacts and updated model registry: {version}")


if __name__ == "__main__":
    train()
