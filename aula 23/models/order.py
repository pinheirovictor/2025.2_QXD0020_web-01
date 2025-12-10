from sqlmodel import SQLModel, Field
from typing import Optional, List

class Order(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    total: float = 0.0

class OrderItem(SQLModel, table=True):
    order_id: int = Field(foreign_key="order.id", primary_key=True)
    product_id: int = Field(foreign_key="product.id", primary_key=True)
    quantity: int
    price: float  # price at purchase time
