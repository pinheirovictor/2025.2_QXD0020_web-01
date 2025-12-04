from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, Session
from database import get_session
from models import Membership

router = APIRouter(prefix="/memberships", tags=["Membership"])


@router.post("/", response_model=Membership)
def criar_membership(data: Membership, session: Session = Depends(get_session)):
    session.add(data)
    session.commit()
    session.refresh(data)
    return data


@router.get("/", response_model=list[Membership])
def listar(session: Session = Depends(get_session)):
    return session.exec(select(Membership)).all()


@router.delete("/{id}")
def deletar(id: int, session: Session = Depends(get_session)):
    membership = session.get(Membership, id)
    if not membership:
        raise HTTPException(404, "Membership não encontrado")

    session.delete(membership)
    session.commit()
    return {"mensagem": "Membership removido"}
