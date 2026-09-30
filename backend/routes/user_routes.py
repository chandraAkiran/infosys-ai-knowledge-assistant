from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from auth.dependencies import (
    get_current_user,
    require_permission,
)
from config.db_session import get_db
from schemas.user_schema import (
    UserCreate,
    UserResponse,
    UserRoleUpdate,
    UserStatusUpdate,
)
from services.user_service import (
    create_user,
    get_user_by_id,
    get_users,
    update_user_role,
    update_user_status,
)


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get("/me")
def get_my_profile(
    current_user: dict = Depends(get_current_user),
):
    return {
        "user_id": current_user["user_id"],
        "email": current_user["email"],
        "role": current_user["role"],
    }


@router.get(
    "/",
    response_model=list[UserResponse],
)
def list_users(
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_permission("manage_users")
    ),
):
    return get_users(db)


@router.post(
    "/",
    response_model=UserResponse,
)
def create_new_user(
    request: UserCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_permission("manage_users")
    ),
):
    try:
        return create_user(
            db=db,
            email=request.email,
            full_name=request.full_name,
            password=request.password,
            role=request.role,
            department=request.department,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        ) from error


@router.patch(
    "/{user_id}/role",
    response_model=UserResponse,
)
def change_user_role(
    user_id: int,
    request: UserRoleUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_permission("manage_users")
    ),
):
    user = update_user_role(
        db=db,
        user_id=user_id,
        role=request.role,
        department=request.department,
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return user


@router.patch(
    "/{user_id}/status",
    response_model=UserResponse,
)
def change_user_status(
    user_id: int,
    request: UserStatusUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_permission("manage_users")
    ),
):
    user = update_user_status(
        db=db,
        user_id=user_id,
        is_active=request.is_active,
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return user


@router.get("/admin-test")
def admin_test(
    current_user: dict = Depends(
        require_permission("manage_users")
    ),
):
    return {
        "message": (
            "You have admin-level "
            "user management permission."
        ),
        "user": current_user,
    }