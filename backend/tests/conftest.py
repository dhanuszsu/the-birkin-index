"""
Pytest configuration and shared fixtures for The Birkin Index test suite.
"""
import os
os.environ["TESTING"] = "1"

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database.session import Base, get_db
from app.main import app
from app.models.source import DataSource
from app.models.record import AuctionRecord

# In-memory SQLite with StaticPool
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///:memory:"

test_engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(autouse=True)
def init_test_db():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture
def db_session():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def client():
    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def sample_source(db_session):
    source = DataSource(
        id="src_sothebys_test",
        name="Sotheby's Paris",
        source_type="auction_house",
        reliability_tier="Tier 1 - Public Live Auction",
        website_url="https://www.sothebys.com",
        is_active=True
    )
    db_session.add(source)
    db_session.commit()
    db_session.refresh(source)
    return source


@pytest.fixture
def sample_illustrative_record(db_session, sample_source):
    rec = AuctionRecord(
        id="rec_test_illus_001",
        model="Birkin 25 Retourne",
        size="25",
        leather="Togo",
        color="Noir",
        hardware="Gold (GHW)",
        condition="Store Fresh / Pristine",
        production_year="2023",
        transaction_type="completed_sale",
        price_in_inr=2478000.0,
        original_price=27500.0,
        original_currency="EUR",
        transaction_date="2024-03-15",
        source_name=sample_source.name,
        source_reference="Lot 42",
        source_url=None,
        price_basis="Price including buyer's premium",
        verification_status="UNVERIFIED",
        verification_notes="Illustrative benchmark reference",
        eligible_for_ml=False,
        is_illustrative=True,
        record_category="illustrative_display",
        notes="Demonstration test record"
    )
    db_session.add(rec)
    db_session.commit()
    db_session.refresh(rec)
    return rec
