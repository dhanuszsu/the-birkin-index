"""Tests for data cleaning, normalization, and ingestion rules."""
from ml.preprocessing.cleaner import (
    validate_record_schema,
    normalize_date,
    normalize_size,
    evaluate_ml_eligibility,
    detect_duplicates
)

def test_normalize_size():
    assert normalize_size(25) == "25"
    assert normalize_size("30cm") == "30"
    assert normalize_size("Birkin 35") == "35"
    assert normalize_size(40.0) == "40"


def test_normalize_date():
    assert normalize_date("2024-05-12") == "2024-05-12"
    assert normalize_date("12/05/2024") == "2024-05-12"
    assert normalize_date("May 12, 2024") == "2024-05-12"
    assert normalize_date("InvalidDate") is None


def test_evaluate_ml_eligibility_rejects_illustrative():
    record = {
        "record_category": "research_dataset",
        "verification_status": "VERIFIED",
        "transaction_type": "completed_sale",
        "price_basis": "Price including buyer's premium",
        "source_url": "https://sothebys.com/lot/1",
        "is_illustrative": True,  # Illustrative!
        "eligible_for_ml": True,
        "price_usd": 25000.0,
        "original_price": 25000.0
    }
    is_eligible, reason = evaluate_ml_eligibility(record)
    assert is_eligible is False
    assert "illustrative" in reason.lower()


def test_evaluate_ml_eligibility_rejects_asking_price():
    record = {
        "record_category": "research_dataset",
        "verification_status": "VERIFIED",
        "transaction_type": "asking_price",  # Asking price!
        "price_basis": "Dealer asking price",
        "source_url": "https://collectorsquare.com/item/1",
        "is_illustrative": False,
        "eligible_for_ml": True,
        "price_usd": 25000.0,
        "original_price": 25000.0
    }
    is_eligible, reason = evaluate_ml_eligibility(record)
    assert is_eligible is False
    assert "asking price" in reason.lower() or "speculative" in reason.lower()


def test_evaluate_ml_eligibility_accepts_verified_sale():
    record = {
        "record_category": "research_dataset",
        "verification_status": "VERIFIED",
        "transaction_type": "completed_sale",
        "price_basis": "Price including buyer's premium",
        "source_url": "https://sothebys.com/lot/verified-1",
        "is_illustrative": False,
        "eligible_for_ml": True,
        "price_usd": 30000.0,
        "original_price": 30000.0
    }
    is_eligible, reason = evaluate_ml_eligibility(record)
    assert is_eligible is True
    assert "eligible" in reason.lower()


def test_detect_duplicates():
    records = [
        {"id": "r1", "source_name": "Sotheby's", "source_reference": "Lot 5", "transaction_date": "2024-01-01"},
        {"id": "r2", "source_name": "Sotheby's", "source_reference": "Lot 5", "transaction_date": "2024-01-01"},
        {"id": "r3", "source_name": "Christie's", "source_reference": "Lot 5", "transaction_date": "2024-01-01"},
    ]
    dupes = detect_duplicates(records)
    assert len(dupes) == 1
    assert dupes[0]["source_reference"] == "Lot 5"
