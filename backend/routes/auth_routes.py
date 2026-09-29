from fastapi import APIRouter, HTTPException, status

from auth.auth_service import hash_password, verify_password
from auth.jwt_util import create_access_token
from schemas.auth_schema import LoginRequest, LoginResponse


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


# Temporary development user.
# This will later come from PostgreSQL.
DEMO_USERS = {
    "employee@infosys.com": {
        "id": 1,
        "email": "employee@infosys.com",
        "password_hash": hash_password("password123"),
        "role": "employee",
    },
}


@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest):

    user = DEMO_USERS.get(request.email)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    if not verify_password(
        request.password,
        user["password_hash"],
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    access_token = create_access_token(
        user_id=user["id"],
        email=user["email"],
        role=user["role"],
    )

    return LoginResponse(
        access_token=access_token,
        user_id=user["id"],
        email=user["email"],
        role=user["role"],
    )