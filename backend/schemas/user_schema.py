from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "employee"
    department: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    department: str
    is_active: bool

    model_config = {
        "from_attributes": True
    }