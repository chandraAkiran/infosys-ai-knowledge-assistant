from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from config.db_session import get_db
from schemas.auth_schema import LoginRequest, LoginResponse
from services.user_service import authenticate_user
from auth.jwt_util import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=LoginResponse)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(
        db,
        login_data.email,
        login_data.password,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        user_id=user.id,
        email=user.email,
        role=user.role,
    )

    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user_id=user.id,
        email=user.email,
        role=user.role,
    )