from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, Session
from database import get_session
from models import Tarefa

router = APIRouter(prefix="/tarefas", tags=["Tarefas"])


@router.post("/", response_model=Tarefa)
def criar_tarefa(tarefa: Tarefa, session: Session = Depends(get_session)):
    session.add(tarefa)
    session.commit()
    session.refresh(tarefa)
    return tarefa


@router.get("/", response_model=list[Tarefa])
def listar_tarefas(session: Session = Depends(get_session)):
    return session.exec(select(Tarefa)).all()


@router.get("/{id}", response_model=Tarefa)
def obter_tarefa(id: int, session: Session = Depends(get_session)):
    tarefa = session.get(Tarefa, id)
    if not tarefa:
        raise HTTPException(404, "Tarefa não encontrada")
    return tarefa


@router.put("/{id}", response_model=Tarefa)
def atualizar_tarefa(id: int, dados: Tarefa, session: Session = Depends(get_session)):
    tarefa = session.get(Tarefa, id)
    if not tarefa:
        raise HTTPException(404, "Tarefa não encontrada")

    tarefa.descricao = dados.descricao
    tarefa.projeto_id = dados.projeto_id

    session.commit()
    session.refresh(tarefa)
    return tarefa


@router.delete("/{id}")
def deletar_tarefa(id: int, session: Session = Depends(get_session)):
    tarefa = session.get(Tarefa, id)
    if not tarefa:
        raise HTTPException(404, "Tarefa não encontrada")

    session.delete(tarefa)
    session.commit()
    return {"mensagem": "Tarefa removida"}
