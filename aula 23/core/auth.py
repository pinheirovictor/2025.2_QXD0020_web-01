from datetime import datetime, timedelta
from jose import jwt, JWTError
from models.user import User

SECRET_KEY = "SUPER_KEY_123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120

role_permissions = {
    "admin": ["users:manage", "category:create", "product:create", "order:view_all"],
    "manager": ["product:create", "product:update", "category:create"],
    "customer": ["order:create", "order:view_own"],
    "support": ["order:view_all"]
}

def create_token(user: User):
    permissions = role_permissions.get(user.role, [])
    data = {
        "sub": str(user.id),
        "email": user.email,
        "role": user.role,
        "permissions": permissions,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None
