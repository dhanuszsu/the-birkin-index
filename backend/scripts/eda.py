import os
import json
import argparse
from pathlib import Path
from typing import Dict, Any
import numpy as np
import pandas as pd

from app.core.config import settings

def run_eda(input_csv: Path) -> Dict[str, Any]:
    print("\n=======================================================")
    print("THE BIRKIN INDEX — EXPLORATORY DATA ANALYSIS (EDA)")
    print(f"Dataset: {input_csv}")
    print("=======================================================\n")
    
    if not input_csv.exists():
        raise FileNotFoundError(f"Clean processed dataset not found at: {input_csv}")
        
    df = pd.read_csv(input_csv)
    n = len(df)
    print(f"Total Records Analyzed: {n}\n")
    
    eda_results: Dict[str, Any] = {
        "dataset_metadata": {
            "total_records": n,
            "columns": list(df.columns),
            "illustrative_count": int(df.get("is_illustrative", pd.Series([False]*n)).sum()),
            "ml_eligible_count": int(df.get("eligible_for_ml", pd.Series([False]*n)).sum()),
        }
    }
    
    # 1. Source Breakdown
    source_counts = df["source_name"].value_counts().to_dict()
    eda_results["source_counts"] = {str(k): int(v) for k, v in source_counts.items()}
    
    # 2. Transaction Type Distribution
    tx_dist = df["transaction_type"].value_counts().to_dict()
    eda_results["transaction_type_distribution"] = {str(k): int(v) for k, v in tx_dist.items()}
    
    # 3. Missing Value Analysis
    missing_analysis = {}
    for col in df.columns:
        null_count = int(df[col].isna().sum())
        missing_analysis[col] = {
            "missing_count": null_count,
            "missing_pct": round((null_count / n) * 100, 2)
        }
    eda_results["missing_value_analysis"] = missing_analysis
    
    # 4. Price Distributions (in USD and INR)
    price_cols = [c for c in ["price_in_usd", "price_in_inr", "original_price"] if c in df.columns]
    price_stats = {}
    for pcol in price_cols:
        series = pd.to_numeric(df[pcol], errors="coerce").dropna()
        if not series.empty:
            price_stats[pcol] = {
                "count": int(series.count()),
                "min": round(float(series.min()), 2),
                "max": round(float(series.max()), 2),
                "mean": round(float(series.mean()), 2),
                "median": round(float(series.median()), 2),
                "std": round(float(series.std()), 2) if len(series) > 1 else 0.0,
                "q25": round(float(series.quantile(0.25)), 2),
                "q75": round(float(series.quantile(0.75)), 2),
            }
    eda_results["price_distributions"] = price_stats
    
    # 5. Price Distribution by Size
    size_grp = df.groupby("size")["price_in_usd" if "price_in_usd" in df.columns else "original_price"].agg(["count", "mean", "median", "min", "max"]).to_dict(orient="index")
    eda_results["price_by_size"] = {str(k): {m: round(float(val), 2) for m, val in metrics.items()} for k, metrics in size_grp.items()}
    
    # 6. Price Distribution by Leather
    leather_grp = df.groupby("leather")["price_in_usd" if "price_in_usd" in df.columns else "original_price"].agg(["count", "mean", "median", "min", "max"]).to_dict(orient="index")
    eda_results["price_by_leather"] = {str(k): {m: round(float(val), 2) for m, val in metrics.items()} for k, metrics in leather_grp.items()}
    
    # 7. Currency Distribution
    curr_counts = df["original_currency"].value_counts().to_dict()
    eda_results["currency_distribution"] = {str(k): int(v) for k, v in curr_counts.items()}
    
    # 8. Condition Distribution
    cond_counts = df["condition"].value_counts().to_dict()
    eda_results["condition_distribution"] = {str(k): int(v) for k, v in cond_counts.items()}
    
    # 9. Correlation Analysis (Where Statistically Meaningful)
    df_corr = pd.DataFrame()
    df_corr["size_num"] = pd.to_numeric(df["size"].astype(str).str.replace("cm", "").str.strip(), errors="coerce")
    cond_map = {"Fair": 1, "Very Good": 2, "Excellent": 3, "Store Fresh / Pristine": 4}
    df_corr["condition_num"] = df["condition"].map(cond_map)
    df_corr["price_usd"] = pd.to_numeric(df.get("price_in_usd", df.get("original_price")), errors="coerce")
    
    corr_matrix = df_corr.corr().round(4).to_dict()
    
    eda_results["correlation_analysis"] = {
        "matrix": corr_matrix,
        "sample_size": n,
        "statistical_rigor_caveat": (
            f"OBSERVATION NOTICE: Sample size (n={n}) is below empirical econometric threshold (n >= 50). "
            "Correlations reported above represent exploratory observations only and must NOT be interpreted as "
            "statistically conclusive hedonic price elasticities."
        )
    }
    
    # Export reports
    processed_dir = settings.DATA_DIR / "processed"
    processed_dir.mkdir(parents=True, exist_ok=True)
    
    json_path = processed_dir / "eda_summary.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(eda_results, f, indent=2)
    print(f"Saved EDA JSON summary to: {json_path}")
    
    # Export readable Markdown dossier
    md_path = processed_dir / "eda_summary.md"
    with open(md_path, "w", encoding="utf-8") as f:
        f.write("# THE BIRKIN INDEX — EXPLORATORY DATA ANALYSIS DOSSIER\n\n")
        f.write(f"**Total Records Analyzed**: {n}  \n")
        f.write(f"**Illustrative Demonstration Records**: {eda_results['dataset_metadata']['illustrative_count']}  \n")
        f.write(f"**ML-Eligible Research Records**: {eda_results['dataset_metadata']['ml_eligible_count']}  \n\n")
        
        f.write("## 1. Transaction Type Distribution\n")
        for k, v in eda_results["transaction_type_distribution"].items():
            f.write(f"- **{k}**: {v} ({round(v/n*100, 1)}%)\n")
            
        f.write("\n## 2. Source Distribution\n")
        for k, v in eda_results["source_counts"].items():
            f.write(f"- **{k}**: {v}\n")
            
        f.write("\n## 3. Price by Scale (USD)\n")
        for sz, st in eda_results["price_by_size"].items():
            f.write(f"- **Birkin {sz}cm** (n={int(st['count'])}): Median ${st['median']:,.0f} | Range: ${st['min']:,.0f} – ${st['max']:,.0f}\n")
            
        f.write("\n## 4. Price by Leather (USD)\n")
        for l, st in eda_results["price_by_leather"].items():
            f.write(f"- **{l}** (n={int(st['count'])}): Median ${st['median']:,.0f} | Mean: ${st['mean']:,.0f}\n")
            
        f.write("\n## 5. Statistical Rigor Disclosure\n")
        f.write(f"> {eda_results['correlation_analysis']['statistical_rigor_caveat']}\n")
        
    print(f"Saved EDA Markdown summary to: {md_path}\n")
    return eda_results

if __name__ == "__main__":
    csv_file = settings.DATA_DIR / "processed" / "archive_records_clean.csv"
    if not csv_file.exists():
        print(f"Processed file not found at {csv_file}. Running ingestion first...")
        from scripts.ingest import run_ingestion
        raw_file = settings.DATA_DIR / "raw" / "illustrative_records.json"
        run_ingestion(raw_file, sync_db=False)
    run_eda(csv_file)
