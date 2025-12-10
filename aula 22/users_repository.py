from sqlmodel import Session, select
from passlib.context import CryptContext
from models import User, UserCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserRepository:

    @staticmethod
    def get_by_email(email: str, session: Session):
        statement = select(User).where(User.email == email)
        return session.exec(statement).first()

    @staticmethod
    def create(user_data: UserCreate, session: Session):
        hashed = pwd_context.hash(user_data.password)
        user = User(
            name=user_data.name,
            email=user_data.email,
            hashed_password=hashed
        )
        session.add(user)
        session.commit()
        session.refresh(user)
        return user

    @staticmethod
    def verify_password(raw, hashed):
        return pwd_context.verify(raw, hashed)
