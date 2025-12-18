from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    email: str
    senha_hash: str
    role: str
    compras: List["Compra"] = Relationship(back_populates="user")

class Sessao(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    filme: str
    sala: str
    data: str
    horario: str
    total_cadeiras: int
    cadeiras_disponiveis: int

    compras: List["Compra"] = Relationship(back_populates="sessao")

class Compra(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    sessao_id: int = Field(foreign_key="sessao.id")
    quantidade: int

    user: User = Relationship(back_populates="compras")
    sessao: Sessao = Relationship(back_populates="compras")
