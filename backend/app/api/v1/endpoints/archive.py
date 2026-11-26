from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
import math

from app.database.session import get_db
from app.schemas.archive import AuctionRecordResponse, AuctionRecordCreate, PaginatedArchiveResponse
from app.services.archive_service import ArchiveService

router = APIRouter()

@router.get("", response_model=PaginatedArchiveResponse, summary="Retrieve Paginated Archive Records")
def list_archive_records(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Records per page"),
    search: Optional[str] = Query(None, description="Keyword search across model, leather, color, source, etc."),
    transaction_type: Optional[str] = Query(None, description="'completed_sale', 'asking_price', 'auction_estimate', or 'all'"),
    size: Optional[str] = Query(None, description="'25', '30', '35', '40', or 'all'"),
    leather: Optional[str] = Query(None, description="Leather or skin filter"),
    color: Optional[str] = Query(None, description="Color shade filter"),
    hardware: Optional[str] = Query(None, description="Hardware finish filter"),
    condition: Optional[str] = Query(None, description="Condition grade filter"),
    production_year: Optional[str] = Query(None, description="Era or year filter (e.g. '2023' or 'vintage')"),
    verification_status: Optional[str] = Query(None, description="'VERIFIED', 'PARTIALLY VERIFIED', 'UNVERIFIED', or 'all'"),
    is_illustrative: Optional[bool] = Query(None, description="Filter for demonstration display records vs research data"),
    sort_by: str = Query("date_desc", description="'date_desc', 'date_asc', 'price_desc', 'price_asc'"),
    db: Session = Depends(get_db),
):
    records, total = ArchiveService.get_records(
        db=db,
        page=page,
        page_size=page_size,
        search=search,
        transaction_type=transaction_type,
        size=size,
        leather=leather,
        color=color,
        hardware=hardware,
        condition=condition,
        production_year=production_year,
        verification_status=verification_status,
        is_illustrative=is_illustrative,
        sort_by=sort_by,
    )
    
    total_pages = math.ceil(total / page_size) if total > 0 else 1
    
    return PaginatedArchiveResponse(
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        has_next=page < total_pages,
        has_prev=page > 1,
        records=records,
    )

@router.get("/{record_id}", response_model=AuctionRecordResponse, summary="Retrieve a Single Archive Record")
def get_archive_record(record_id: str, db: Session = Depends(get_db)):
    record = ArchiveService.get_record_by_id(db=db, record_id=record_id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Archive record with ID '{record_id}' not found."
        )
    return record

@router.post("/records", response_model=AuctionRecordResponse, status_code=status.HTTP_201_CREATED, summary="Create an Archive Record")
def create_archive_record(record_in: AuctionRecordCreate, db: Session = Depends(get_db)):
    return ArchiveService.create_record(db=db, record_in=record_in)
