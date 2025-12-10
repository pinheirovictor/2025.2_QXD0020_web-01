from fastapi import APIRouter, Depends, HTTPException
from models.user import UserCreate
from repositories.user_repository import UserRepository
from core.auth import create_token
from sqlmodel import Session
from database import get_session
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(data: UserCreate, session: Session = Depends(get_session)):
    if UserRepository.find_by_email(data.email, session):
        raise HTTPException(400, "Email já cadastrado")
    return UserRepository.create(data, session)

@router.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends(),
          session: Session = Depends(get_session)):

    user = UserRepository.find_by_email(form.username, session)
    if not user or not UserRepository.verify_password(form.password, user.hashed_password):
        raise HTTPException(400, "Credenciais inválidas")

    token = create_token(user)
    return {"access_token": token, "token_type": "bearer"}
