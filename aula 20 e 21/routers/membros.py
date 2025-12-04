from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, Session
from database import get_session
from models import Membro

router = APIRouter(prefix="/membros", tags=["Membros"])


@router.post("/", response_model=Membro)
def criar_membro(membro: Membro, session: Session = Depends(get_session)):
    session.add(membro)
    session.commit()
    session.refresh(membro)
    return membro


@router.get("/", response_model=list[Membro])
def listar_membros(session: Session = Depends(get_session)):
    return session.exec(select(Membro)).all()


@router.get("/{id}", response_model=Membro)
def obter_membro(id: int, session: Session = Depends(get_session)):
    membro = session.get(Membro, id)
    if not membro:
        raise HTTPException(404, "Membro não encontrado")
    return membro


@router.put("/{id}", response_model=Membro)
def atualizar_membro(id: int, dados: Membro, session: Session = Depends(get_session)):
    membro = session.get(Membro, id)
    if not membro:
        raise HTTPException(404, "Membro não encontrado")

    membro.nome = dados.nome
    membro.equipe_id = dados.equipe_id

    session.commit()
    session.refresh(membro)
    return membro


@router.delete("/{id}")
def deletar_membro(id: int, session: Session = Depends(get_session)):
    membro = session.get(Membro, id)
    if not membro:
        raise HTTPException(404, "Membro não encontrado")

    session.delete(membro)
    session.commit()
    return {"mensagem": "Membro removido"}
