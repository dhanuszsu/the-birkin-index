from sqlalchemy.orm import Session
from sqlalchemy import or_, desc, asc
from typing import Optional, Tuple, List
import uuid

from app.models.record import AuctionRecord
from app.schemas.archive import AuctionRecordCreate

class ArchiveService:
    @staticmethod
    def get_records(
        db: Session,
        page: int = 1,
        page_size: int = 20,
        search: Optional[str] = None,
        transaction_type: Optional[str] = None,
        size: Optional[str] = None,
        leather: Optional[str] = None,
        color: Optional[str] = None,
        hardware: Optional[str] = None,
        condition: Optional[str] = None,
        production_year: Optional[str] = None,
        verification_status: Optional[str] = None,
        is_illustrative: Optional[bool] = None,
        sort_by: str = "date_desc",
    ) -> Tuple[List[AuctionRecord], int]:
        query = db.query(AuctionRecord)
        
        # Filtering
        if transaction_type and transaction_type != "all":
            query = query.filter(AuctionRecord.transaction_type == transaction_type)
            
        if size and size != "all":
            query = query.filter(AuctionRecord.size == size)
            
        if leather and leather != "all":
            query = query.filter(AuctionRecord.leather.ilike(f"%{leather}%"))
            
        if color and color != "all":
            query = query.filter(AuctionRecord.color.ilike(f"%{color}%"))
            
        if hardware and hardware != "all":
            query = query.filter(AuctionRecord.hardware.ilike(f"%{hardware}%"))
            
        if condition and condition != "all":
            query = query.filter(AuctionRecord.condition.ilike(f"%{condition}%"))
            
        if production_year and production_year != "all":
            if production_year == "vintage":
                # Pre-2020
                query = query.filter(AuctionRecord.production_year < "2020")
            else:
                query = query.filter(AuctionRecord.production_year == production_year)
                
        if verification_status and verification_status != "all":
            query = query.filter(AuctionRecord.verification_status == verification_status)
            
        if is_illustrative is not None:
            query = query.filter(AuctionRecord.is_illustrative == is_illustrative)
            
        # Free search
        if search and search.strip():
            s = f"%{search.strip()}%"
            query = query.filter(
                or_(
                    AuctionRecord.model.ilike(s),
                    AuctionRecord.size.ilike(s),
                    AuctionRecord.leather.ilike(s),
                    AuctionRecord.color.ilike(s),
                    AuctionRecord.hardware.ilike(s),
                    AuctionRecord.source_name.ilike(s),
                    AuctionRecord.source_reference.ilike(s),
                    AuctionRecord.condition.ilike(s),
                    AuctionRecord.production_year.ilike(s),
                )
            )
            
        # Sorting
        if sort_by == "date_desc":
            query = query.order_by(desc(AuctionRecord.transaction_date).nullslast(), desc(AuctionRecord.created_at))
        elif sort_by == "date_asc":
            query = query.order_by(asc(AuctionRecord.transaction_date).nullsfirst(), asc(AuctionRecord.created_at))
        elif sort_by == "price_desc":
            query = query.order_by(desc(AuctionRecord.price_in_inr))
        elif sort_by == "price_asc":
            query = query.order_by(asc(AuctionRecord.price_in_inr))
        else:
            query = query.order_by(desc(AuctionRecord.created_at))
            
        total = query.count()
        offset = (page - 1) * page_size
        records = query.offset(offset).limit(page_size).all()
        
        return records, total

    @staticmethod
    def get_record_by_id(db: Session, record_id: str) -> Optional[AuctionRecord]:
        return db.query(AuctionRecord).filter(AuctionRecord.id == record_id).first()

    @staticmethod
    def create_record(db: Session, record_in: AuctionRecordCreate) -> AuctionRecord:
        record_data = record_in.model_dump()
        if not record_data.get("id"):
            record_data["id"] = f"REC-MANUAL-{uuid.uuid4().hex[:8].upper()}"
            
        # Enforce ML eligibility guard:
        # Any record without verified status, direct catalogue URL, or illustrative mark cannot be eligible
        if record_data.get("is_illustrative") is True or record_data.get("verification_status") != "VERIFIED" or not record_data.get("source_url"):
            record_data["eligible_for_ml"] = False
            
        db_obj = AuctionRecord(**record_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
