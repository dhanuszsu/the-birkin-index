from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.api.v1.api import api_router
from app.database.session import engine, Base
import app.database.base  # Ensures all models are registered
from scripts.seed_illustrative import seed_database_if_empty

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables on startup
    Base.metadata.create_all(bind=engine)
    # Seed default data sources and illustrative frontend records if database is empty
    seed_database_if_empty()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="The Birkin Index: High-precision luxury resale valuation and market intelligence API.",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Controlled CORS for Vite development frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register v1 router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to The Birkin Index API",
        "version": settings.VERSION,
        "docs_url": "/docs",
        "api_v1": settings.API_V1_STR,
    }

