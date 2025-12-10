from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from core.auth import decode_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if payload is None:
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    return payload

def require_permission(permission: str):
    def wrapper(user = Depends(get_current_user)):
        if permission not in user["permissions"]:
            raise HTTPException(status_code=403, detail="Sem permissão")
        return user
    return wrapper
