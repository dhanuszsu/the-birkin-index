import re
from datetime import datetime
from typing import Dict, Any, List, Tuple, Optional
import pandas as pd

VALID_SIZES = {"25", "30", "35", "40"}
VALID_TRANSACTION_TYPES = {"completed_sale", "asking_price", "auction_estimate"}
VALID_PRICE_BASES = {
    "Hammer price",
    "Price including buyer's premium",
    "Dealer asking price",
    "Auction estimate",
}
VALID_VERIFICATION_STATUSES = {"VERIFIED", "PARTIALLY VERIFIED", "UNVERIFIED"}
VALID_CURRENCIES = {"EUR", "USD", "GBP", "HKD", "INR"}

# Standardized Exchange Rates relative to USD (baseline benchmark for ingestion normalization)
FOREX_TO_USD = {
    "USD": 1.0,
    "EUR": 1.08,
    "GBP": 1.28,
    "HKD": 0.128,
    "INR": 0.0118,
}

def validate_record_schema(record: Dict[str, Any]) -> Tuple[bool, List[str]]:
    """Validates required columns, datatypes, and boundaries without inventing data."""
    errors = []
    
    required_fields = [
        "model", "size", "leather", "color", "hardware", "condition",
        "transaction_type", "price_basis", "original_price", "original_currency",
        "source_name", "source_reference"
    ]
    
    for f in required_fields:
        val = record.get(f)
        if val is None or (isinstance(val, str) and not val.strip()):
            errors.append(f"Missing required field: '{f}'")
            
    # Numeric price validation
    price = record.get("original_price")
    try:
        f_price = float(price)
        if f_price <= 0:
            errors.append(f"Invalid original_price: {price} must be strictly > 0")
    except (ValueError, TypeError):
        errors.append(f"Non-numeric original_price: {price}")
        
    # Enum checks
    t_type = record.get("transaction_type")
    if t_type and t_type not in VALID_TRANSACTION_TYPES:
        errors.append(f"Invalid transaction_type: '{t_type}'. Expected one of {VALID_TRANSACTION_TYPES}")
        
    p_basis = record.get("price_basis")
    if p_basis and p_basis not in VALID_PRICE_BASES:
        errors.append(f"Invalid price_basis: '{p_basis}'. Expected one of {VALID_PRICE_BASES}")
        
    curr = str(record.get("original_currency", "")).upper().strip()
    if curr and curr not in VALID_CURRENCIES:
        errors.append(f"Unsupported original_currency: '{curr}'. Expected one of {VALID_CURRENCIES}")
        
    return len(errors) == 0, errors

def normalize_date(date_val: Any) -> Optional[str]:
    """Normalizes date into strict ISO YYYY-MM-DD or None."""
    if not date_val or pd.isna(date_val):
        return None
    s = str(date_val).strip()
    # Try YYYY-MM-DD and common catalogue date formats
    for fmt in (
        "%Y-%m-%d",
        "%Y/%m/%d",
        "%d-%m-%Y",
        "%d/%m/%Y",
        "%B %d, %Y",
        "%b %d, %Y",
        "%d %B %Y",
        "%d %b %Y",
        "%Y",
    ):
        try:
            dt = datetime.strptime(s, fmt)
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            pass
    return None

def normalize_size(size_val: Any) -> str:
    """Normalizes size into standard string: '25', '30', '35', '40'."""
    s = str(size_val).replace("cm", "").strip()
    if s in VALID_SIZES:
        return s
    for valid in VALID_SIZES:
        if valid in s:
            return valid
    return s

def evaluate_ml_eligibility(record: Dict[str, Any]) -> Tuple[bool, str]:
    """
    Enforces strict research protocol:
    Records are admitted for ML training ONLY if authentic, verified, post-sale hammer/buyer's premium,
    with genuine source URL proof, and not flagged as illustrative.
    """
    if record.get("record_category") != "research_dataset":
        return False, "Not categorized as research_dataset."
    if record.get("is_illustrative") is True:
        return False, "Marked as illustrative demonstration record."
    if record.get("verification_status") != "VERIFIED":
        return False, f"Verification status is {record.get('verification_status')}, not VERIFIED."
    if record.get("eligible_for_ml") is not True:
        return False, "Eligible_for_ml flag is False."
    if record.get("price_basis") in ["Dealer asking price", "Auction estimate"]:
        return False, f"Price basis is '{record.get('price_basis')}', which contains speculative margins or estimates."
    if not record.get("source_url"):
        return False, "Lacks verifiable primary catalogue URL."
    try:
        if float(record.get("original_price", 0)) <= 0:
            return False, "Price must be strictly positive."
    except (ValueError, TypeError):
        return False, "Invalid price."
        
    return True, "Eligible for ML training dataset."

def detect_duplicates(records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Identifies duplicate lots based on (source_name, source_reference, transaction_date)."""
    seen = {}
    duplicates = []
    for r in records:
        key = (
            str(r.get("source_name", "")).strip().lower(),
            str(r.get("source_reference", "")).strip().lower(),
            str(r.get("transaction_date", "")).strip()
        )
        if key in seen:
            duplicates.append(r)
        else:
            seen[key] = r
    return duplicates

def process_raw_records(records: List[Dict[str, Any]]) -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
    """
    Processes, normalizes, separates price bases, and generates a reproducible ingestion log.
    Never silently invents missing values.
    """
    cleaned_records = []
    log = {
        "timestamp": datetime.utcnow().isoformat(),
        "total_input_records": len(records),
        "valid_records": 0,
        "invalid_records": 0,
        "duplicates_detected": 0,
        "completed_sales_count": 0,
        "dealer_asks_count": 0,
        "auction_estimates_count": 0,
        "ml_eligible_count": 0,
        "quarantined_illustrative_count": 0,
        "errors": []
    }
    
    seen_keys = set()
    
    for idx, r in enumerate(records):
        is_valid, errors = validate_record_schema(r)
        if not is_valid:
            log["invalid_records"] += 1
            log["errors"].append({"index": idx, "id": r.get("id"), "errors": errors})
            continue
            
        # Duplicate detection key
        dup_key = (
            str(r.get("source_name", "")).strip().lower(),
            str(r.get("source_reference", "")).strip().lower(),
            str(r.get("transaction_date", "")).strip()
        )
        if dup_key in seen_keys:
            log["duplicates_detected"] += 1
            log["errors"].append({"index": idx, "id": r.get("id"), "warning": "Duplicate transaction detected; skipped"})
            continue
        seen_keys.add(dup_key)
        
        # Normalization
        rec = dict(r)
        rec["size"] = normalize_size(rec.get("size"))
        rec["transaction_date"] = normalize_date(rec.get("transaction_date"))
        rec["original_currency"] = str(rec.get("original_currency", "EUR")).upper().strip()
        rec["original_price"] = float(rec["original_price"])
        
        # Calculate price_in_usd using Forex
        forex_rate = FOREX_TO_USD.get(rec["original_currency"], 1.0)
        rec["price_in_usd"] = round(rec["original_price"] * forex_rate, 2)
        
        # Enforce ML eligibility strictly
        is_ml_ok, reason = evaluate_ml_eligibility(rec)
        rec["eligible_for_ml"] = is_ml_ok
        if is_ml_ok:
            log["ml_eligible_count"] += 1
        else:
            rec["ml_exclusion_reason"] = reason
            
        if rec.get("is_illustrative"):
            log["quarantined_illustrative_count"] += 1
            
        # Count by transaction type
        tt = rec.get("transaction_type")
        if tt == "completed_sale":
            log["completed_sales_count"] += 1
        elif tt == "asking_price":
            log["dealer_asks_count"] += 1
        elif tt == "auction_estimate":
            log["auction_estimates_count"] += 1
            
        cleaned_records.append(rec)
        log["valid_records"] += 1
        
    return cleaned_records, log

