"""Tests for ML eligibility rules and strict data quarantine."""
import pytest
from app.models.record import AuctionRecord

def test_illustrative_records_cannot_be_ml_eligible(db_session, sample_illustrative_record):
    rec = db_session.query(AuctionRecord).filter(AuctionRecord.id == sample_illustrative_record.id).first()
    assert rec.is_illustrative is True
    assert rec.eligible_for_ml is False
    assert rec.record_category == "illustrative_display"


def test_verified_record_without_source_url_is_not_ml_eligible():
    from ml.preprocessing.cleaner import evaluate_ml_eligibility
    record = {
        "record_category": "research_dataset",
        "verification_status": "VERIFIED",
        "transaction_type": "completed_sale",
        "price_basis": "Price including buyer's premium",
        "source_url": None,  # Missing source URL!
        "is_illustrative": False,
        "eligible_for_ml": True,
        "original_price": 25000.0,
        "price_usd": 25000.0
    }
    eligible, reason = evaluate_ml_eligibility(record)
    assert eligible is False
    assert "source url" in reason.lower() or "catalogue url" in reason.lower()
