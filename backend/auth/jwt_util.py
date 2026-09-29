from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt

from config.env_config import JWT_SECRET_KEY


ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(
    user_id: int,
    email: str,
    role: str,
) -> str:

    if not JWT_SECRET_KEY:
        raise ValueError("JWT_SECRET_KEY is not configured.")

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "user_id": user_id,
        "email": email,
        "role": role,
        "exp": expire,
    }

    return jwt.encode(
        payload,
        JWT_SECRET_KEY,
        algorithm=ALGORITHM,
    )


def decode_access_token(token: str) -> dict:

    if not JWT_SECRET_KEY:
        raise ValueError("JWT_SECRET_KEY is not configured.")

    try:
        payload = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        return payload

    except JWTError as exc:
        raise ValueError("Invalid or expired access token.") from exc