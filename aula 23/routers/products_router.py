from fastapi import APIRouter, Depends, HTTPException
from models.product import Product
from repositories.product_repository import ProductRepository
from core.security import get_current_user, require_permission
from sqlmodel import Session
from database import get_session

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/", dependencies=[Depends(require_permission("product:create"))])
def create_product(data: Product,
                   user = Depends(get_current_user),
                   session: Session = Depends(get_session)):
    data.owner_id = int(user["sub"])
    return ProductRepository.create(data, session)

@router.get("/")
def list_products(session: Session = Depends(get_session)):
    return ProductRepository.all(session)
