from sqlmodel import SQLModel, Field
from typing import Optional

class User(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    role: str = Field(default="customer")  # admin, manager, customer, support
    is_active: bool = Field(default=True)

class UserCreate(SQLModel):
    email: str
    password: str
    role: str = "customer"

class UserRead(SQLModel):
    id: int
    email: str
    role: str
    is_active: bool
