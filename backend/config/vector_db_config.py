from config.env_config import get_env_variable


VECTOR_DB_PATH = get_env_variable(
    "VECTOR_DB_PATH",
    "vector_db",
)

VECTOR_COLLECTION_NAME = get_env_variable(
    "VECTOR_COLLECTION_NAME",
    "enterprise_knowledge",
)


def get_vector_db_path() -> str:
    return VECTOR_DB_PATH


def get_vector_collection_name() -> str:
    return VECTOR_COLLECTION_NAME