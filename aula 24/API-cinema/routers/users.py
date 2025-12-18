from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import User
from schemas import UserCreate, UserLogin
from auth import hash_password, verify_password, create_token

router = APIRouter()

@router.post("/signup")
def signup(data: UserCreate, session: Session = Depends(get_session)):
    user_exists = session.exec(select(User).where(User.email == data.email)).first()
    if user_exists:
        raise HTTPException(400, "Email já utilizado.")

    user = User(
        nome=data.nome,
        email=data.email,
        senha_hash=hash_password(data.senha),
        role=data.role
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.post("/login")
def login(data: UserLogin, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == data.email)).first()
    if not user or not verify_password(data.senha, user.senha_hash):
        raise HTTPException(401, "Credenciais inválidas")

    token = create_token({"sub": user.email, "user_id": user.id, "role": user.role})
    return {"access_token": token}
