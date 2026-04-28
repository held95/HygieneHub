# 🧼 HygieneHub

Dashboard de gerenciamento de produtos de higiene pessoal — sabonetes, shampoos e condicionadores.

**Stack:** ASP.NET Core 8 · Entity Framework Core · PostgreSQL (Supabase) · Chart.js · Vercel + Railway

---

## ✨ Funcionalidades

- CRUD completo de produtos via API REST
- Dashboard com 3 gráficos interativos (Chart.js)
- Cards de estatísticas em tempo real
- Busca e filtro por categoria
- Seed automático com 20 produtos pré-cadastrados
- Swagger UI para explorar a API
- Deploy: backend no Railway, frontend na Vercel

---

## 🗂️ Estrutura

```
HygieneHub/
├── HygieneHub.API/          # Backend ASP.NET Core 8
│   ├── Controllers/         # Endpoints REST
│   ├── Models/              # Entidade Product
│   ├── DTOs/                # CreateProductDto, UpdateProductDto
│   ├── Data/                # AppDbContext + SeedData
│   ├── Services/            # IProductService + ProductService
│   ├── Program.cs           # DI, CORS, Swagger, EF, Seed
│   └── Dockerfile           # Para deploy no Railway
└── HygieneHub.Frontend/     # Dashboard estático (Vercel)
    ├── index.html
    ├── css/style.css
    └── js/ (api.js, charts.js, app.js)
```

---

## 🚀 Como rodar localmente

### Pré-requisitos
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8)
- Conta no [Supabase](https://supabase.com) com um projeto criado

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/hygienehub.git
cd hygienehub
```

### 2. Configurar a string de conexão do Supabase

Crie o arquivo `HygieneHub.API/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=db.XXXX.supabase.co;Port=5432;Database=postgres;Username=postgres;Password=SUA_SENHA;SSL Mode=Require;Trust Server Certificate=true"
  },
  "AllowedOrigins": "http://localhost:5500,http://127.0.0.1:5500"
}
```

> A string de conexão está em: Supabase → Project Settings → Database → Connection string → URI

### 3. Rodar a API

```bash
cd HygieneHub.API
dotnet run
```

A API sobe em `http://localhost:5000`  
Swagger UI: `http://localhost:5000/swagger`

### 4. Abrir o dashboard

Abra `HygieneHub.Frontend/index.html` com Live Server (VS Code) ou qualquer servidor HTTP local.  
A URL padrão do `api.js` aponta para `http://localhost:5000`.

---

## ☁️ Deploy em produção

### Backend — Railway

1. Crie uma conta em [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub" → selecione este repositório
3. Configure a raiz do serviço como `HygieneHub.API` (ou use o Dockerfile)
4. Adicione as variáveis de ambiente:
   - `ConnectionStrings__DefaultConnection` = string do Supabase
   - `AllowedOrigins` = `https://SEU-APP.vercel.app`
5. Deploy automático a cada push no GitHub

### Frontend — Vercel

1. Crie uma conta em [vercel.com](https://vercel.com)
2. "New Project" → importar este repositório
3. **Root Directory:** `HygieneHub.Frontend`
4. Edite `js/api.js` e troque `http://localhost:5000` pela URL do Railway
5. Deploy!

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/products` | Lista produtos (query: `search`, `category`) |
| GET | `/api/products/{id}` | Busca por ID |
| GET | `/api/products/stats` | Estatísticas para o dashboard |
| POST | `/api/products` | Cria produto |
| PUT | `/api/products/{id}` | Atualiza produto |
| DELETE | `/api/products/{id}` | Remove produto |
| GET | `/health` | Health check |

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Framework | ASP.NET Core 8 |
| ORM | Entity Framework Core 8 + Npgsql |
| Banco | PostgreSQL (Supabase) |
| Documentação | Swagger / OpenAPI |
| Frontend | HTML5, CSS3, JavaScript (vanilla) |
| Gráficos | Chart.js 4 |
| Deploy API | Railway |
| Deploy Frontend | Vercel |

---

Feito com C# e .NET 8.
