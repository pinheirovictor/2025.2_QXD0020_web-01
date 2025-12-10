from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import APIKeyHeader
from sqlmodel import Session

from database import create_db, get_session
from users_repository import UserRepository
from models import UserCreate, UserLogin
from auth import criar_token, validar_token

app = FastAPI()

# Esquema para pegar o header Authorization
auth_scheme = APIKeyHeader(name="Authorization")

create_db()


# ----------------------
#  Registrar Usuário
# ----------------------
@app.post("/register")
def register(user_data: UserCreate, session: Session = Depends(get_session)):
    user_exists = UserRepository.get_by_email(user_data.email, session)

    if user_exists:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado")

    user = UserRepository.create(user_data, session)
    return {"message": "Usuário criado com sucesso", "user_id": user.id}


# ----------------------
#  Login
# ----------------------
@app.post("/login")
def login(data: UserLogin, session: Session = Depends(get_session)):
    user = UserRepository.get_by_email(data.email, session)

    if not user:
        raise HTTPException(status_code=400, detail="Credenciais inválidas")

    if not UserRepository.verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Credenciais inválidas")

    token = criar_token({"sub": user.email, "role": user.role})
    return {"access_token": token, "token_type": "bearer"}


# ----------------------
#  Middleware de autenticação
# ----------------------
def get_current_user(token: str = Depends(auth_scheme)):
    # token chega como: "Bearer xyz"
    if token.lower().startswith("bearer "):
        token = token[7:]  # remove prefixo
    
    payload = validar_token(token)

    if payload is None:
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")

    return payload


# ----------------------
#  Rotas protegidas
# ----------------------
@app.get("/me")
def me(user = Depends(get_current_user)):
    return {"usuario_logado": user}


@app.get("/admin")
def admin_only(user = Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Acesso negado")

    return {"message": "Bem-vindo à área administrativa!"}
