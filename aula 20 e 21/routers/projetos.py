from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, Session
from database import get_session
from models import Projeto

router = APIRouter(prefix="/projetos", tags=["Projetos"])


@router.post("/", response_model=Projeto)
def criar_projeto(projeto: Projeto, session: Session = Depends(get_session)):
    session.add(projeto)
    session.commit()
    session.refresh(projeto)
    return projeto


@router.get("/", response_model=list[Projeto])
def listar_projetos(session: Session = Depends(get_session)):
    return session.exec(select(Projeto)).all()


@router.get("/{id}", response_model=Projeto)
def obter_projeto(id: int, session: Session = Depends(get_session)):
    projeto = session.get(Projeto, id)
    if not projeto:
        raise HTTPException(404, "Projeto não encontrado")
    return projeto


@router.put("/{id}", response_model=Projeto)
def atualizar_projeto(id: int, dados: Projeto, session: Session = Depends(get_session)):
    projeto = session.get(Projeto, id)
    if not projeto:
        raise HTTPException(404, "Projeto não encontrado")

    projeto.nome = dados.nome
    projeto.descricao = dados.descricao
    projeto.equipe_id = dados.equipe_id

    session.commit()
    session.refresh(projeto)
    return projeto


@router.delete("/{id}")
def deletar_projeto(id: int, session: Session = Depends(get_session)):
    projeto = session.get(Projeto, id)
    if not projeto:
        raise HTTPException(404, "Projeto não encontrado")

    session.delete(projeto)
    session.commit()
    return {"mensagem": "Projeto removido"}


@router.get("/{id}/tarefas")
def listar_tarefas(id: int, session: Session = Depends(get_session)):
    projeto = session.get(Projeto, id)
    if not projeto:
        raise HTTPException(404, "Projeto não encontrado")

    return projeto.tarefas
