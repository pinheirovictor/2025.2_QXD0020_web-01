from fastapi import FastAPI
from database import create_db_and_tables
from routers.auth_router import router as auth_router
from routers.categories_router import router as categories_router
from routers.products_router import router as products_router
from routers.orders_router import router as orders_router

app = FastAPI(title="E-Commerce API")

create_db_and_tables()

app.include_router(auth_router)
app.include_router(categories_router)
app.include_router(products_router)
app.include_router(orders_router)
