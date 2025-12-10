from sqlmodel import Session, select
from models.product import Product

class ProductRepository:

    @staticmethod
    def create(data: Product, session: Session):
        session.add(data)
        session.commit()
        session.refresh(data)
        return data

    @staticmethod
    def get(product_id: int, session: Session):
        return session.exec(select(Product).where(Product.id == product_id)).first()

    @staticmethod
    def update(product: Product, session: Session):
        session.add(product)
        session.commit()
        session.refresh(product)
        return product

    @staticmethod
    def delete(product: Product, session: Session):
        session.delete(product)
        session.commit()

    @staticmethod
    def all(session: Session):
        return session.exec(select(Product)).all()
