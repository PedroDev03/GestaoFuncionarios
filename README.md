# Gestão de Funcionários - SAAM

Aplicação Full Stack de gestão de funcionários desenvolvida com Spring Boot, React.js, typescript e PostgreSQL.

## Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-----------|
| Backend | Java 17 + Spring Boot 3.1 |
| ORM | Spring Data JPA |
| Migrations | FlywayDB |
| Autenticação | JWT (BCrypt) |
| Frontend | React.js 18 + Vite + tailwind|
| Banco de Dados | PostgreSQL 16 |
| Infraestrutura | Docker + Docker Compose |

## Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

Nenhuma outra dependência é necessária (Java, Node.js, Maven são executados dentro dos containers).

## Como Rodar

```bash
# Clone o repositório
git clone <https://github.com/PedroDev03/GestaoFuncionarios.git>
cd GestaoFuncinarios

# Suba todos os serviços
docker-compose up --build
```

Aguarde o build completar. Quando o backend estiver pronto, acesse:

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080 |

## Credenciais de Acesso

| Campo | Valor |
|-------|-------|
| E-mail | `admin@saam.com.br` |
| Senha | `admin123` |

## Estrutura do Projeto

```
.
├── backend/                    # API Spring Boot
│   ├── src/main/java/com/saam/gestao/
│   │   ├── controller/         # AuthController, FuncionarioController
│   │   ├── service/            # AuthService, FuncionarioService
│   │   ├── repository/         # UsuarioRepository, FuncionarioRepository
│   │   ├── entity/             # Usuario, Funcionario
│   │   ├── dto/                # Records de request/response
│   │   ├── config/             # SecurityConfig, JwtUtil, JwtFilter
│   │   └── DataInitializer.java
│   ├── src/main/resources/
│   │   ├── db/migration/
│   │   │   ├── V1__create_tables.sql
│   │   │   └── V2__seed_data.sql
│   │   └── application.properties
│   └── Dockerfile
├── frontend/                   # SPA React.js
│   ├── src/
│   │   ├── pages/              # Login.jsx, Dashboard.tsx
│   │   ├── services/           # api.ts (Axios)
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── Dockerfile
└── docker-compose.yml
```

## Endpoints da API

| Método | Endpoint | Auth | Descrição |
|--------|----------|------|-----------|
| POST | `/api/auth/login` | Não | Login com e-mail e senha |
| GET | `/api/funcionarios` | Sim | Lista todos os funcionários |
| POST | `/api/funcionarios` | Sim | Cadastra novo funcionário |
| PATCH | `/{id}/status` | Não | Alteração do status pelo id |

### Exemplo de Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@saam.com.br","senha":"admin123"}'
```

### Exemplo de Listagem (com token)

```bash
curl http://localhost:8080/api/funcionarios \
  -H "Authorization: Bearer <token>"
```
