📄 README.md (COMPLETO – prontinho para usar no GitHub)
# 🏪 E-Commerce API – FastAPI + SQLModel + OAuth2 + JWT + RBAC

Este projeto implementa uma API completa e didática de e-commerce usando **FastAPI**, **SQLModel**, **OAuth2 com JWT**, **autorização baseada em papéis (RBAC)** e banco de dados SQLite.

A API contém:

✔ Autenticação OAuth2 Password Flow  
✔ JWT com roles + permissions  
✔ 5 entidades  
✔ Relacionamentos completos (1:1, 1:N, N:N)  
✔ Regras de permissão por papel  
✔ Arquitetura limpa em camadas  
✔ Endpoints REST profissionais  
✔ Documentação completa via Swagger  

Ideal para disciplinas de **Desenvolvimento Web**, **API REST**, **Arquitetura de Software**, ou **FastAPI Avançado**.

---

# 🚀 Tecnologias Utilizadas

- **FastAPI**
- **SQLModel**
- **SQLite**
- **JWT (python-jose)**
- **OAuth2PasswordBearer**
- **Passlib (bcrypt)**
- **RBAC / PBAC**
- **Uvicorn**

---

# 📁 Arquitetura do Projeto



app/
├─ core/
│ ├─ auth.py
│ ├─ security.py
│ ├─ permissions.py
├─ models/
│ ├─ user.py
│ ├─ profile.py
│ ├─ category.py
│ ├─ product.py
│ ├─ order.py
├─ repositories/
│ ├─ user_repository.py
│ ├─ product_repository.py
│ ├─ category_repository.py
│ ├─ order_repository.py
├─ services/
│ ├─ user_service.py
│ ├─ order_service.py
│ ├─ product_service.py
├─ routers/
│ ├─ auth_router.py
│ ├─ users_router.py
│ ├─ categories_router.py
│ ├─ products_router.py
│ ├─ orders_router.py
├─ database.py
└─ main.py


---

# 🧩 Modelagem do Banco de Dados (ER Diagram)

Este sistema utiliza relacionamentos 1:1, 1:N e N:N.

```mermaid
erDiagram

    User ||--|| Profile : has
    User ||--o{ Order : "places"
    Category ||--o{ Product : "has many"
    Order ||--o{ OrderItem : "contains"
    Product ||--o{ OrderItem : "in many orders"

    User {
        int id PK
        string email
        string hashed_password
        string role
        bool is_active
    }

    Profile {
        int id PK
        int user_id FK
        string full_name
        string address
        string phone
    }

    Category {
        int id PK
        string name
    }

    Product {
        int id PK
        string name
        string description
        float price
        int stock
        int category_id FK
        int owner_id FK
    }

    Order {
        int id PK
        int user_id FK
        float total
    }

    OrderItem {
        int order_id FK
        int product_id FK
        int quantity
        float price
    }

🔐 Autenticação & Autorização

A API usa OAuth2 Password Flow:

Login:
POST /auth/login


Campos:

username = email
password = senha


Retorno:

{
  "access_token": "<JWT_TOKEN>",
  "token_type": "bearer"
}

Enviar token nas rotas protegidas:
Authorization: Bearer <seu_token>

👥 Papeis (Roles) e Permissões (RBAC)

Cada usuário possui um role, que define suas permissões:

Role	Permissões
admin	users:manage, product:create, product:delete, order:view_all
manager	product:create, product:update, category:create
customer	order:create, order:view_own
support	order:view_all

O token JWT inclui:

{
  "sub": 3,
  "email": "customer@site.com",
  "role": "customer",
  "permissions": ["order:create", "order:view_own"]
}

🧪 Testes – Passo a Passo (Mostre aos alunos!)
1️⃣ Criar usuários
POST /auth/register


Exemplo (admin):

{
  "email": "admin@site.com",
  "password": "123456",
  "role": "admin"
}


Exemplo (manager):

{
  "email": "manager@site.com",
  "password": "123456",
  "role": "manager"
}


Exemplo (customer):

{
  "email": "customer@site.com",
  "password": "123456",
  "role": "customer"
}

2️⃣ Autenticar (OAuth2 Password Flow)
POST /auth/login


Campos:

username: admin@site.com
password: 123456


Cole o token no botão Authorize do Swagger.

3️⃣ Criar categoria (admin ou manager)
POST /categories/
{
  "name": "Eletrônicos"
}

4️⃣ Criar produto (admin ou manager)
POST /products/
{
  "name": "Notebook",
  "description": "Inspiron 15",
  "price": 3500,
  "stock": 10,
  "category_id": 1
}

5️⃣ Criar pedido (customer)
POST /orders/
[
  { "product_id": 1, "qty": 2 }
]


O sistema:

calcula total

diminui estoque

cria Order e OrderItems

6️⃣ Listar meus pedidos (customer)
GET /orders/me

7️⃣ Listar todos os pedidos (admin / support)
GET /orders/

🛠 Como Rodar o Projeto
1. Instalar dependências
pip install fastapi uvicorn sqlmodel python-jose passlib[bcrypt]

2. Rodar servidor
uvicorn app.main:app --reload


Acesse a documentação Swagger:

http://localhost:8000/docs

🧱 Funcionalidades Implementadas

Registro de usuários com roles

Login via OAuth2

JWT com permissões

CRUD de categorias

CRUD de produtos ligado a usuários manager/admin

Sistema completo de pedidos (Orders)

OrderItem para N:N entre Order e Product

Atualização de estoque automática

Rotas protegidas por RBAC

Estrutura modular e limpa

📜 Licença

MIT License.

👨‍🏫 Autor

Professor (Seu Nome Aqui)
Disciplina: Desenvolvimento Web – FastAPI
Instituição: Universidade Federal do Ceará