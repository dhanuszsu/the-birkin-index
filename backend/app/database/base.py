from app.database.session import Base
# Import all models here so that Alembic/Base.metadata can see them
from app.models.source import DataSource
from app.models.record import AuctionRecord
from app.models.model_metadata import ModelMetadata
