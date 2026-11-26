import os
from typing import List
from pathlib import Path

class Settings:
    PROJECT_NAME: str = "The Birkin Index API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Base paths
    BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
    DATA_DIR: Path = BASE_DIR / "data"
    ML_ARTIFACTS_DIR: Path = BASE_DIR / "ml" / "artifacts"
    
    # SQLite Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR}/birkin_index.db")
    
    # Controlled CORS for Vite development frontend
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ]

settings = Settings()
