from fastapi import APIRouter, Depends

from auth.dependencies import get_current_user, require_permission


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


@router.get("/admin-test")
def admin_test(
    current_user: dict = Depends(
        require_permission("manage_users")
    ),
):
    return {
        "message": "You have admin-level user management permission.",
        "user": current_user,
    }