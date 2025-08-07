## Prova de Suficiência – Programação Web II (NestJS)

**Aluno**: Lucas Hoffmann Rosa do Nascimento

Aplicação backend construída com **NestJS** para gerenciar comandas (bills), com autenticação via JWT, documentação com Swagger e persistência em **SQLite** usando **TypeORM**.

### Tecnologias
- **NestJS** (API REST)
- **TypeORM** + **SQLite** (`db.sqlite`)
- **JWT** (Passport + @nestjs/jwt)
- **class-validator** / **class-transformer**
- **Swagger** (OpenAPI) em `/docs`

### Como rodar
1. Instale as dependências:
   - Yarn: `yarn`
2. Inicie em desenvolvimento:
   - Yarn: `yarn start:dev`
3. A API sobe em `http://localhost:3000`.

### Importante: Prefixo global
Todos os endpoints da API utilizam o prefixo global:

- Base da API: `http://localhost:3000/RestAPIFurb`
- Documentação Swagger: `http://localhost:3000/docs`

### Autenticação
- Registro e login são públicos.
- Demais endpoints requerem header `Authorization: Bearer <seu_token_jwt>`.
