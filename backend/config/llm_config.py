from config.env_config import GOOGLE_API_KEY, get_env_variable


LLM_MODEL = get_env_variable(
    "LLM_MODEL",
    "gemini-2.5-flash",
)

EMBEDDING_MODEL = get_env_variable(
    "EMBEDDING_MODEL",
    "gemini-embedding-2",
)


def get_google_api_key() -> str | None:
    return GOOGLE_API_KEY