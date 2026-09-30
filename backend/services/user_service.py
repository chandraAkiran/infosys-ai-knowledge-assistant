from sqlalchemy.orm import Session

from auth.auth_service import hash_password, verify_password
from models.user_model import User


def get_user_by_email(
    db: Session,
    email: str,
) -> User | None:

    return (
        db.query(User)
        .filter(User.email == email)
        .first()
    )


def get_user_by_id(
    db: Session,
    user_id: int,
) -> User | None:

    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


def get_users(
    db: Session,
) -> list[User]:

    return (
        db.query(User)
        .order_by(User.created_at.desc())
        .all()
    )


def create_user(
    db: Session,
    email: str,
    full_name: str,
    password: str,
    role: str,
    department: str,
) -> User:

    existing_user = get_user_by_email(
        db,
        email,
    )

    if existing_user:
        raise ValueError(
            "User with this email already exists."
        )

    user = User(
        email=email,
        full_name=full_name,
        role=role,
        department=department,
        is_active=True,
        password_hash=hash_password(password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def update_user_role(
    db: Session,
    user_id: int,
    role: str,
    department: str,
) -> User | None:

    user = get_user_by_id(
        db,
        user_id,
    )

    if user is None:
        return None

    user.role = role
    user.department = department

    db.commit()
    db.refresh(user)

    return user


def update_user_status(
    db: Session,
    user_id: int,
    is_active: bool,
) -> User | None:

    user = get_user_by_id(
        db,
        user_id,
    )

    if user is None:
        return None

    user.is_active = is_active

    db.commit()
    db.refresh(user)

    return user


def authenticate_user(
    db: Session,
    email: str,
    password: str,
) -> User | None:

    user = get_user_by_email(
        db,
        email,
    )

    if user is None:
        return None

    if not user.is_active:
        return None

    if not verify_password(
        password,
        user.password_hash,
    ):
        return None

    return user