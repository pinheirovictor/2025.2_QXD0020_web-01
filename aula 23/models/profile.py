from sqlmodel import SQLModel, Field
from typing import Optional

class Profile(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    user_id: int = Field(foreign_key="user.id", unique=True)
    full_name: str
    address: str = ""
    phone: str = ""
