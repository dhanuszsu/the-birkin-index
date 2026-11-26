import os
import json
import argparse
from pathlib import Path
from typing import List, Dict, Any
import pandas as pd

from app.core.config import settings
from ml.preprocessing.cleaner import process_raw_records
from app.database.session import SessionLocal, engine, Base
from app.models.record import AuctionRecord

def load_file(file_path: Path) -> List[Dict[str, Any]]:
    """Loads CSV or JSON raw records."""
    if not file_path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")
        
    ext = file_path.suffix.lower()
    if ext == ".json":
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data if isinstance(data, list) else [data]
    elif ext in [".csv", ".tsv"]:
        df = pd.read_csv(file_path, sep="," if ext == ".csv" else "\t")
        return df.to_dict(orient="records")
    else:
        raise ValueError(f"Unsupported file format '{ext}'. Must be .csv or .json")

def run_ingestion(input_file: Path, sync_db: bool = True) -> Dict[str, Any]:
    print(f"\n=======================================================")
    print(f"THE BIRKIN INDEX — DATA INGESTION PIPELINE")
    print(f"Ingesting: {input_file}")
    print(f"=======================================================\n")
    
    raw_records = load_file(input_file)
    print(f"Loaded {len(raw_records)} raw records.")
    
    # Process records
    cleaned_records, report = process_raw_records(raw_records)
    
    # Setup output paths
    processed_dir = settings.DATA_DIR / "processed"
    training_dir = settings.DATA_DIR / "training"
    processed_dir.mkdir(parents=True, exist_ok=True)
    training_dir.mkdir(parents=True, exist_ok=True)
    
    # 1. Export clean processed records
    clean_json_path = processed_dir / "archive_records_clean.json"
    with open(clean_json_path, "w", encoding="utf-8") as f:
        json.dump(cleaned_records, f, indent=2)
    print(f"Exported clean records to: {clean_json_path}")
    
    clean_csv_path = processed_dir / "archive_records_clean.csv"
    pd.DataFrame(cleaned_records).to_csv(clean_csv_path, index=False)
    print(f"Exported clean CSV to: {clean_csv_path}")
    
    # 2. Export ML-eligible dataset strictly
    ml_eligible = [r for r in cleaned_records if r.get("eligible_for_ml") is True]
    ml_csv_path = training_dir / "ml_training_eligible.csv"
    if ml_eligible:
        pd.DataFrame(ml_eligible).to_csv(ml_csv_path, index=False)
        print(f"Exported {len(ml_eligible)} ML-eligible records to: {ml_csv_path}")
    else:
        # Create empty placeholder with headers
        pd.DataFrame(columns=list(cleaned_records[0].keys()) if cleaned_records else []).to_csv(ml_csv_path, index=False)
        print(f"ZERO records met ML eligibility criteria. Created empty dataset at: {ml_csv_path}")
        
    # 3. Export reproducible ingestion report
    report_path = processed_dir / "ingestion_report.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
    print(f"Ingestion log saved to: {report_path}\n")
    
    # 4. Optional Database Sync
    if sync_db and cleaned_records:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        try:
            upserted = 0
            for r in cleaned_records:
                rec_id = r.get("id")
                if not rec_id:
                    continue
                existing = db.query(AuctionRecord).filter(AuctionRecord.id == rec_id).first()
                if existing:
                    for k, v in r.items():
                        if hasattr(existing, k) and k not in ["created_at"]:
                            setattr(existing, k, v)
                else:
                    db_obj = AuctionRecord(**{k: v for k, v in r.items() if hasattr(AuctionRecord, k)})
                    db.add(db_obj)
                upserted += 1
            db.commit()
            print(f"Synchronized {upserted} records into SQLite database.")
        finally:
            db.close()
            
    print("\n--- INGESTION SUMMARY ---")
    print(f"Total Input:            {report['total_input_records']}")
    print(f"Valid Clean Records:    {report['valid_records']}")
    print(f"Duplicates Quarantined: {report['duplicates_detected']}")
    print(f"Completed Sales:        {report['completed_sales_count']}")
    print(f"Dealer Asking Prices:   {report['dealer_asks_count']}")
    print(f"Auction Estimates:      {report['auction_estimates_count']}")
    print(f"ML-Eligible Records:    {report['ml_eligible_count']}")
    print(f"Quarantined Demo:       {report['quarantined_illustrative_count']}")
    print("-------------------------\n")
    
    return report

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ingest research and archive records into The Birkin Index pipeline.")
    parser.add_argument(
        "--file",
        type=str,
        default=str(settings.DATA_DIR / "raw" / "illustrative_records.json"),
        help="Path to CSV or JSON input file",
    )
    parser.add_argument("--no-db", action="store_true", help="Skip database synchronization")
    args = parser.parse_args()
    
    target_path = Path(args.file)
    # If illustrative_records.json doesn't exist yet, seed it from scripts/seed_illustrative.py
    if not target_path.exists():
        from scripts.seed_illustrative import ILLUSTRATIVE_RECORDS
        target_path.parent.mkdir(parents=True, exist_ok=True)
        with open(target_path, "w", encoding="utf-8") as f:
            json.dump(ILLUSTRATIVE_RECORDS, f, indent=2)
            
    run_ingestion(target_path, sync_db=not args.no_db)
