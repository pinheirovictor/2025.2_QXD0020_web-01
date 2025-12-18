from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import create_db
from routers import users, sessoes, compras

app = FastAPI(title="Cinema API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_db()

app.include_router(users.router)
app.include_router(sessoes.router)
app.include_router(compras.router)
