import os

from dotenv import load_dotenv


load_dotenv()


def get_env_variable(name: str, default: str | None = None) -> str | None:
    return os.getenv(name, default)


GOOGLE_API_KEY = get_env_variable("GOOGLE_API_KEY")
DATABASE_URL = get_env_variable("DATABASE_URL")
JWT_SECRET_KEY = get_env_variable(
    "JWT_SECRET_KEY",
    "change-this-for-local-development",
)