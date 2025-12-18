from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from models import Sessao
from schemas import SessaoCreate
from auth import get_current_user
from database import get_session

router = APIRouter()

# ---------------------------
# Criar sessão (admin)
# ---------------------------
@router.post("/sessoes")
def criar_sessao(
    data: SessaoCreate,
    session: Session = Depends(get_session),
    user = Depends(get_current_user)
):
    if user["role"] != "admin":
        raise HTTPException(403, "Apenas administradores podem criar sessões.")

    sessao = Sessao(
        filme=data.filme,
        sala=data.sala,
        data=data.data,
        horario=data.horario,
        total_cadeiras=data.total_cadeiras,
        cadeiras_disponiveis=data.total_cadeiras,
    )
    session.add(sessao)
    session.commit()
    session.refresh(sessao)
    return sessao


# ---------------------------
# GET - listar todas as sessões
# ---------------------------
@router.get("/sessoes")
def listar_sessoes(session: Session = Depends(get_session)):
    sessoes = session.exec(select(Sessao)).all()
    return sessoes


# ---------------------------
# GET - buscar sessão por ID
# ---------------------------
@router.get("/sessoes/{sessao_id}")
def obter_sessao(sessao_id: int, session: Session = Depends(get_session)):
    sessao = session.get(Sessao, sessao_id)
    if not sessao:
        raise HTTPException(404, "Sessão não encontrada")
    return sessao
