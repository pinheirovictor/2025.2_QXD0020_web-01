from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, Session
from database import get_session
from models import Equipe

router = APIRouter(prefix="/equipes", tags=["Equipes"])


@router.post("/", response_model=Equipe)
def criar_equipe(equipe: Equipe, session: Session = Depends(get_session)):
    session.add(equipe)
    session.commit()
    session.refresh(equipe)
    return equipe


@router.get("/", response_model=list[Equipe])
def listar_equipes(session: Session = Depends(get_session)):
    return session.exec(select(Equipe)).all()


from sqlalchemy import func

@router.get("/paginado")
def listar_equipes(
    session: Session = Depends(get_session),
    page: int = 1,
    limit: int = 10
):
    offset = (page - 1) * limit

    # Consulta paginada
    equipes = session.exec(
        select(Equipe).offset(offset).limit(limit)
    ).all()

    # Consulta total -> usando func.count()
    total = session.exec(
        select(func.count()).select_from(Equipe)
    ).one()

    # Calcula total de páginas
    pages = (total + limit - 1) // limit

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "pages": pages,
        "data": equipes
    }



@router.get("/{id}", response_model=Equipe)
def obter_equipe(id: int, session: Session = Depends(get_session)):
    equipe = session.get(Equipe, id)
    if not equipe:
        raise HTTPException(404, "Equipe não encontrada")
    return equipe


@router.put("/{id}", response_model=Equipe)
def atualizar_equipe(id: int, dados: Equipe, session: Session = Depends(get_session)):
    equipe = session.get(Equipe, id)
    if not equipe:
        raise HTTPException(404, "Equipe não encontrada")

    equipe.nome = dados.nome
    equipe.descricao = dados.descricao

    session.commit()
    session.refresh(equipe)
    return equipe


@router.delete("/{id}")
def deletar_equipe(id: int, session: Session = Depends(get_session)):
    equipe = session.get(Equipe, id)
    if not equipe:
        raise HTTPException(404, "Equipe não encontrada")

    session.delete(equipe)
    session.commit()
    return {"mensagem": "Equipe removida com sucesso"}


@router.get("/{id}/membros")
def listar_membros(id: int, session: Session = Depends(get_session)):
    equipe = session.get(Equipe, id)
    if not equipe:
        raise HTTPException(404, "Equipe não encontrada")

    return equipe.membros


@router.get("/{id}/projetos")
def listar_projetos(id: int, session: Session = Depends(get_session)):
    equipe = session.get(Equipe, id)
    if not equipe:
        raise HTTPException(404, "Equipe não encontrada")

    return equipe.projetos
