from fastapi import APIRouter
from app.api.v1.endpoints import health, archive, sources, model, valuation

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["System Health"])
api_router.include_router(archive.router, prefix="/archive", tags=["Price Archive"])
api_router.include_router(sources.router, prefix="/sources", tags=["Data Sources"])
api_router.include_router(model.router, prefix="/model", tags=["Model Operations"])
api_router.include_router(valuation.router, prefix="/valuation", tags=["Valuation Engine"])
