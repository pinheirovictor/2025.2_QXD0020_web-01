from fastapi import APIRouter, Depends, HTTPException
from core.security import get_current_user, require_permission
from repositories.order_repository import OrderRepository
from repositories.product_repository import ProductRepository
from sqlmodel import Session
from database import get_session

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", dependencies=[Depends(require_permission("order:create"))])
def create_order(
    items: list[dict],  # [{"product_id": 1, "qty": 2}]
    user = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    order = OrderRepository.create_order(int(user["sub"]), session)

    total = 0

    for item in items:
        product = ProductRepository.get(item["product_id"], session)
        if not product:
            raise HTTPException(404, "Produto não existe")

        if product.stock < item["qty"]:
            raise HTTPException(400, "Estoque insuficiente")

        price = product.price
        OrderRepository.add_item(order.id, product.id, item["qty"], price, session)

        product.stock -= item["qty"]
        session.add(product)
        total += price * item["qty"]

    order.total = total
    session.add(order)
    session.commit()
    return order

@router.get("/me")
def my_orders(user = Depends(get_current_user),
              session: Session = Depends(get_session)):
    return OrderRepository.get_user_orders(int(user["sub"]), session)
