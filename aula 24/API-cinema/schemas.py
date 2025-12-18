from pydantic import BaseModel

class UserCreate(BaseModel):
    nome: str
    email: str
    senha: str
    role: str

class UserLogin(BaseModel):
    email: str
    senha: str

class SessaoCreate(BaseModel):
    filme: str
    sala: str
    data: str
    horario: str
    total_cadeiras: int

class CompraCreate(BaseModel):
    sessao_id: int
    quantidade: int
