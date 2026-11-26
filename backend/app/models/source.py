from sqlalchemy import Column, String, Boolean, DateTime
from datetime import datetime
from app.database.session import Base

class DataSource(Base):
    __tablename__ = "data_sources"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    source_type = Column(String, nullable=False)  # auction_house, specialist_dealer, curatorial_archive
    website_url = Column(String, nullable=True)
    reliability_tier = Column(String, nullable=False)  # Tier 1 - Public Live Auction, Tier 2 - Established Dealer, Tier 3 - Unvetted
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
