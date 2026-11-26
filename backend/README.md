# The Birkin Index — Backend & Machine Learning Infrastructure

The backend service for **The Birkin Index**, providing RESTful APIs, SQLite persistent storage, strict data validation pipelines, exploratory data analysis dossiers, and machine learning training infrastructure.

---

## Architecture Overview

```
backend/
├── app/
│   ├── main.py                  # FastAPI application entrypoint with CORS & lifecycle
│   ├── core/
│   │   └── config.py            # Application settings, paths, and CORS configuration
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── health.py    # Health check endpoint
│   │       │   ├── archive.py   # Archive records query, filter, search, create
│   │       │   ├── sources.py   # Data source register query
│   │       │   ├── model.py     # Model status & eligibility audit
│   │       │   └── valuation.py # Prediction endpoint (with 503 guard)
│   │       └── api.py           # V1 route aggregator
│   ├── models/                  # SQLAlchemy ORM models
│   │   ├── record.py            # AuctionRecord (with price basis & ML flags)
│   │   ├── source.py            # DataSource (auction house / dealer metadata)
│   │   └── model_metadata.py    # ModelMetadata (hyperparameters, metrics, status)
│   ├── schemas/                 # Pydantic schemas (request/response validation)
│   ├── database/                # SQLAlchemy session & base setup
│   └── services/                # Business logic & query services
├── data/
│   ├── data_dictionary.md       # Comprehensive field specification & integrity rules
│   ├── source_register.json     # 13 verified auction houses & dealer profiles
│   ├── raw/                     # Seed illustrative records
│   ├── processed/               # Normalized CSVs, JSONs, and EDA summaries
│   └── training/                # Quarantined ML-eligible dataset
├── ml/
│   ├── preprocessing/           # Cleaner & BirkinFeatureTransformer
│   ├── training/                # Candidate regression models (Baseline, Linear, Ridge, Random Forest)
│   ├── evaluation/              # Metrics calculator (MAE, RMSE, R², MAPE, MdAPE)
│   └── artifacts/               # Model registry & serialized joblib pipelines
├── scripts/
│   ├── seed_illustrative.py     # Seeds registered sources & illustrative records
│   ├── ingest.py                # Ingestion pipeline with validation & quarantine
│   ├── eda.py                   # Exploratory Data Analysis report generator
│   └── train.py                 # Training script with sample threshold enforcement
├── tests/                       # Complete pytest suite (health, archive, ingestion, ML rules, prediction)
├── requirements.txt             # Python dependencies
└── README.md
```

---

## Data Integrity & Quarantine Rules

1. **Demonstration Quarantine**: All illustrative records (`is_illustrative: True`) are strictly segregated from ML training pipelines.
2. **Price Basis Isolation**:
   - `Hammer price` (exclusive of premium)
   - `Price including buyer's premium` (standard secondary market settlement)
   - `Dealer asking price` (retail catalog offer, non-clearing)
   - `Auction estimate` (pre-sale valuation band)
   Different price types are NEVER pooled into training targets.
3. **Econometric Sample Threshold**:
   - Models require a minimum empirical sample size of **$N \ge 50$ verified completed auction sales**.
   - If genuine verified records are below 50 (currently 0 verified vs. 15 illustrative), the training script logs `status='unavailable'` and refuses to produce predictive estimates.
4. **Prediction Refusal Guard**:
   - `POST /api/v1/valuation/predict` returns an explicit `HTTP 503 Service Unavailable` with structured diagnostic information explaining why no uncalibrated model will produce fictitious estimates.

---

## Setup & Execution

### 1. Requirements Installation

Ensure Python 3.10+ is installed:

```bash
pip install -r backend/requirements.txt
```

### 2. Database Seeding

Initialize the SQLite database (`backend/birkin_index.db`) with registered sources and demonstration archive records:

```bash
cmd /c "set PYTHONPATH=backend&& python backend/scripts/seed_illustrative.py"
```

### 3. Data Ingestion Pipeline

Run the ingestion cleaner, deduplicator, and ML eligibility evaluator:

```bash
cmd /c "set PYTHONPATH=backend&& python backend/scripts/ingest.py"
```

Generates:
- `backend/data/processed/archive_records_clean.csv`
- `backend/data/processed/archive_records_clean.json`
- `backend/data/training/ml_training_eligible.csv` (0 records, strictly quarantined)
- `backend/data/processed/ingestion_report.json`

### 4. Exploratory Data Analysis (EDA)

Generate comprehensive statistical dossiers:

```bash
cmd /c "set PYTHONPATH=backend&& python backend/scripts/eda.py"
```

Outputs:
- `backend/data/processed/eda_summary.json`
- `backend/data/processed/eda_summary.md`

### 5. Model Training Suite

Execute the training CLI:

```bash
cmd /c "set PYTHONPATH=backend&& python backend/scripts/train.py"
```

Enforces quarantine guard:
- Accurately reports 0 ML-eligible verified records.
- Records uncalibrated status in SQLite and `backend/ml/artifacts/model_registry.json`.

### 6. Starting the API Server

Launch the FastAPI development server with Uvicorn:

```bash
cmd /c "set PYTHONPATH=backend&& uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"
```

Interactive API Documentation:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 7. Running Backend Tests

Execute the automated test suite with pytest:

```bash
cmd /c "set PYTHONPATH=backend&& pytest backend/tests -v"
```

---

## API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Service health status and version |
| `GET` | `/api/v1/archive` | Paginated search, filter, and sort across archive records |
| `GET` | `/api/v1/archive/{record_id}` | Detailed record by ID |
| `POST` | `/api/v1/archive/records` | Ingest new record (validates ML eligibility flags) |
| `GET` | `/api/v1/sources` | List registered auction houses and dealers |
| `GET` | `/api/v1/model/status` | Model calibration status, metrics, and sample size audit |
| `POST` | `/api/v1/valuation/predict` | Valuation prediction (refuses with HTTP 503 when uncalibrated) |
