# Desafio Movies

Aplicação full stack para gerenciamento de filmes, com frontend em React/TypeScript e backend em C# (.NET 8), integrada com a API do TMDB.

## 🚀 Como Executar

### Backend
1. Configure a API Key do TMDB em `src/backend/Movies.Api/appsettings.json`
2. Restaure dependências: `cd src/backend && dotnet restore`
3. Execute: `cd Movies.Api && dotnet run`

### Frontend
1. Instale dependências: `cd src/frontend && npm install`
## 🔗 Deploy

- **Frontend:** [Vercel](https://vercel.com) - Conecte o repositório e configure root directory como `src/frontend`
- **Backend:** [Render](https://render.com) - Web Service com Docker, root directory como `/` (raiz)
- **Docker Local:** `docker build -t movies-api .` e `docker run -p 8080:80 movies-api`

O projeto está online em: https://desafio-movie.vercel.app

## 🔐 Credenciais de Teste
- **Usuário:** `GI` / Senha: `nuCl3o`
- **Admin:** `ADMIN` / Senha: `l#gUin`

## 🛠️ Tecnologias
- **Backend:** .NET 8, ASP.NET Core, Entity Framework, SQLite, JWT
- **Frontend:** React 18, TypeScript, Material-UI

## 📡 API
- Documentação Swagger: `http://localhost:5000/swagger`
- Frontend: `http://localhost:3000`

