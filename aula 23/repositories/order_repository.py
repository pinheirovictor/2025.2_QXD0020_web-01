from sqlmodel import Session, select
from models.order import Order, OrderItem

class OrderRepository:

    @staticmethod
    def create_order(user_id: int, session: Session):
        order = Order(user_id=user_id, total=0)
        session.add(order)
        session.commit()
        session.refresh(order)
        return order

    @staticmethod
    def add_item(order_id: int, product_id: int, qty: int, price: float, session: Session):
        item = OrderItem(order_id=order_id, product_id=product_id, quantity=qty, price=price)
        session.add(item)
        session.commit()
        return item

    @staticmethod
    def get(order_id: int, session: Session):
        return session.exec(select(Order).where(Order.id == order_id)).first()

    @staticmethod
    def get_user_orders(user_id: int, session: Session):
        return session.exec(select(Order).where(Order.user_id == user_id)).all()
