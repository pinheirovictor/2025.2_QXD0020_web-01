from fastapi import APIRouter, Depends
from repositories.category_repository import CategoryRepository
from core.security import require_permission, get_current_user
from sqlmodel import Session
from database import get_session

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.post("/", dependencies=[Depends(require_permission("category:create"))])
def create_category(name: str, session: Session = Depends(get_session)):
    return CategoryRepository.create(name, session)

@router.get("/")
def list_categories(session: Session = Depends(get_session)):
    return CategoryRepository.all(session)
