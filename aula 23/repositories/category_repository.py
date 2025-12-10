from sqlmodel import Session, select
from models.category import Category

class CategoryRepository:

    @staticmethod
    def create(name: str, session: Session):
        category = Category(name=name)
        session.add(category)
        session.commit()
        session.refresh(category)
        return category

    @staticmethod
    def all(session: Session):
        return session.exec(select(Category)).all()
