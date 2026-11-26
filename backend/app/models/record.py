from sqlalchemy import Column, String, Float, Boolean, DateTime, ForeignKey, Text
from datetime import datetime
from app.database.session import Base

class AuctionRecord(Base):
    __tablename__ = "auction_records"
    
    id = Column(String, primary_key=True, index=True)
    model = Column(String, nullable=False, index=True)            # e.g. "Birkin 25 Retourne", "Birkin 30 Sellier"
    size = Column(String, nullable=False, index=True)             # e.g. "25", "30", "35", "40"
    leather = Column(String, nullable=False, index=True)          # e.g. "Togo", "Epsom", "Clemence", "Box Calf", "Porosus Crocodile"
    color = Column(String, nullable=False, index=True)            # e.g. "Noir (89)", "Gold (37)", "Etoupe (18)"
    hardware = Column(String, nullable=False, index=True)         # e.g. "Gold (GHW)", "Palladium (PHW)"
    condition = Column(String, nullable=False)                    # e.g. "Store Fresh / Pristine", "Excellent", "Very Good"
    production_year = Column(String, nullable=True)               # e.g. "2023", "2021"
    blind_stamp = Column(String, nullable=True)                   # e.g. "B", "U", "Y"
    
    # Financial & Basis Distinction
    transaction_type = Column(String, nullable=False, index=True) # completed_sale, asking_price, auction_estimate
    price_basis = Column(String, nullable=False)                  # "Hammer price", "Price including buyer's premium", "Dealer asking price", "Auction estimate"
    original_price = Column(Float, nullable=False)                # Exact nominal price in native sale currency
    original_currency = Column(String, nullable=False)            # EUR, USD, GBP, HKD
    price_in_inr = Column(Float, nullable=False)                  # Standardized multi-currency reference amount
    transaction_date = Column(String, nullable=True, index=True)  # ISO YYYY-MM-DD
    
    # Provenance & Source Register
    source_id = Column(String, ForeignKey("data_sources.id"), nullable=True)
    source_name = Column(String, nullable=False)                  # e.g. "Sotheby's Paris", "Christie's New York"
    source_reference = Column(String, nullable=False)             # Catalogue Lot or Consignment ID
    source_url = Column(String, nullable=True)                    # Direct catalogue URL (null for unverified/illustrative)
    
    # Data Integrity & ML Protocol
    verification_status = Column(String, nullable=False, default="UNVERIFIED", index=True) # VERIFIED, PARTIALLY VERIFIED, UNVERIFIED
    verification_notes = Column(Text, nullable=True)
    eligible_for_ml = Column(Boolean, nullable=False, default=False, index=True)
    is_illustrative = Column(Boolean, nullable=False, default=True, index=True)
    record_category = Column(String, nullable=False, default="illustrative_display") # illustrative_display vs research_dataset
    
    # Specification Nuances
    accessories = Column(Text, nullable=True)
    provenance = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
