from sqlmodel import SQLModel, Field
from typing import Optional

class Product(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    name: str
    description: str
    price: float
    stock: int
    category_id: int = Field(foreign_key="category.id")
    owner_id: int = Field(foreign_key="user.id")  # manager/admin
