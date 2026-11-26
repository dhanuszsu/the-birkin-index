from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.source import DataSource
from app.schemas.source import DataSourceCreate

class SourceService:
    @staticmethod
    def get_sources(db: Session) -> List[DataSource]:
        return db.query(DataSource).filter(DataSource.is_active == True).all()

    @staticmethod
    def get_source_by_id(db: Session, source_id: str) -> Optional[DataSource]:
        return db.query(DataSource).filter(DataSource.id == source_id).first()

    @staticmethod
    def create_source(db: Session, source_in: DataSourceCreate) -> DataSource:
        db_source = DataSource(**source_in.model_dump())
        db.add(db_source)
        db.commit()
        db.refresh(db_source)
        return db_source
