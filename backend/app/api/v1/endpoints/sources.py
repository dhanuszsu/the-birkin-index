from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.schemas.source import DataSourceResponse
from app.services.source_service import SourceService

router = APIRouter()

@router.get("", response_model=List[DataSourceResponse], summary="List Registered Provenance Data Sources")
def list_sources(db: Session = Depends(get_db)):
    return SourceService.get_sources(db=db)
