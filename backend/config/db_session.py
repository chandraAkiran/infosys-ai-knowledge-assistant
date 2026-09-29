from collections.abc import Generator

from sqlalchemy.orm import Session, sessionmaker

from config.db_config import create_database_engine


engine = None
SessionLocal = None


def initialize_database():
    global engine, SessionLocal

    engine = create_database_engine()

    SessionLocal = sessionmaker(
        bind=engine,
        autoflush=False,
        autocommit=False,
    )


def get_db() -> Generator[Session, None, None]:
    if SessionLocal is None:
        raise RuntimeError("Database has not been initialized.")

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()