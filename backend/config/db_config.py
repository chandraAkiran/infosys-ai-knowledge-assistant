from sqlalchemy import create_engine

from config.env_config import DATABASE_URL


def get_database_url() -> str:
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL is not configured.")

    return DATABASE_URL


def create_database_engine():
    database_url = get_database_url()

    return create_engine(
        database_url,
        pool_pre_ping=True,
    )