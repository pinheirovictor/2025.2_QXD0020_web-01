from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from models import Sessao, Compra
from schemas import CompraCreate
from auth import get_current_user
from database import get_session

router = APIRouter()

# ---------------------------
# Comprar ingressos
# ---------------------------
@router.post("/comprar")
def comprar(
    data: CompraCreate,
    session: Session = Depends(get_session),
    user = Depends(get_current_user)
):
    sessao = session.get(Sessao, data.sessao_id)
    if not sessao:
        raise HTTPException(404, "Sessão não encontrada")

    if sessao.cadeiras_disponiveis < data.quantidade:
        raise HTTPException(400, "Cadeiras insuficientes disponíveis")

    sessao.cadeiras_disponiveis -= data.quantidade

    compra = Compra(
        user_id=user["user_id"],
        sessao_id=sessao.id,
        quantidade=data.quantidade
    )

    session.add(compra)
    session.commit()
    session.refresh(compra)
    return compra


# ---------------------------
# GET - compras do usuário autenticado
# ---------------------------
@router.get("/compras/minhas")
def minhas_compras(
    session: Session = Depends(get_session),
    user = Depends(get_current_user)
):
    compras = session.exec(
        select(Compra).where(Compra.user_id == user["user_id"])
    ).all()

    return compras


# ---------------------------
# GET - todas as compras (apenas admin)
# ---------------------------
@router.get("/compras")
def listar_compras(
    session: Session = Depends(get_session),
    user = Depends(get_current_user)
):
    if user["role"] != "admin":
        raise HTTPException(403, "Apenas admins podem ver todas as compras.")

    compras = session.exec(select(Compra)).all()
    return compras
