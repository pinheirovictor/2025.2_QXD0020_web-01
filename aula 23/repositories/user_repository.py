from sqlmodel import Session, select
from passlib.context import CryptContext
from models.user import User, UserCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserRepository:

    @staticmethod
    def find_by_email(email: str, session: Session):
        return session.exec(select(User).where(User.email == email)).first()

    @staticmethod
    def create(data: UserCreate, session: Session):
        hashed = pwd_context.hash(data.password)
        user = User(email=data.email, hashed_password=hashed, role=data.role)
        session.add(user)
        session.commit()
        session.refresh(user)
        return user

    @staticmethod
    def verify_password(raw, hashed):
        return pwd_context.verify(raw, hashed)
