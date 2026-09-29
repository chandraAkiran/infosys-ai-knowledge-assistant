from config.db_session import initialize_database
from models.base import Base
from models import (
    User,
    Document,
    AuditLog,
    Feedback,
    Connector,
)


def initialize_tables():
    initialize_database()

    from config.db_session import engine

    if engine is None:
        raise RuntimeError(
            "Database engine has not been initialized."
        )

    Base.metadata.create_all(
        bind=engine,
    )