# ISY One

Sistema de gerenciamento e execução de scripts construído com NestJS, permitindo gerenciamento de scripts shell, execução assíncrona e monitoramento de resultados.

## 🚀 Tecnologias Utilizadas

### Backend
- **NestJS 11.0.1** - Framework Node.js progressivo
- **Prisma 7.8.0** - ORM type-safe para TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Passport** - Middleware de autenticação
- **JWT** - Autenticação baseada em tokens
- **Zod 4.4.3** - Validação de schemas
- **Zod Validation Error** - Tratamento de erros de validação

### Ferramentas de Desenvolvimento
- **TypeScript 5.7.3** - Tipagem estática
- **Jest 30.0.0** - Framework de testes
- **ESLint 9.18.0** - Linting de código
- **Prettier 3.4.2** - Formatação de código
- **Docker** - Containerização

## 📋 Funcionalidades

- **Gerenciamento de Scripts**: Criação, leitura, atualização e exclusão de scripts
- **Execução de Scripts**: Execução assíncrona de scripts shell com monitoramento
- **Histórico de Execuções**: Registro completo de execuções com status, stdout e stderr
- **Autenticação JWT**: Sistema de autenticação seguro com tokens
- **Gerenciamento de Usuários**: Registro e autenticação de usuários
- **Organizações**: Suporte a múltiplas organizações
- **Configurações**: Sistema de settings para configurações globais
- **Arquitetura DDD**: Domain-Driven Design com separação clara de camadas
- **Clean Architecture**: Separação de preocupações e responsabilidades

## 🛠️ Pré-requisitos

- Node.js 20+
- PostgreSQL (ou use Docker Compose)
- npm, yarn ou pnpm

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd isy-one
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/isy_one"
PORT=3000
JWT_SECRET=your-secret-key
```

## 🚀 Executando o Projeto

### Com Docker Compose (Recomendado)

1. Inicie o PostgreSQL:
```bash
docker-compose up -d
```

2. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run start:dev
```

### Sem Docker

1. Certifique-se de ter o PostgreSQL rodando localmente
2. Configure a `DATABASE_URL` no `.env`
3. Execute as migrações:
```bash
npx prisma migrate dev
```

4. Inicie o servidor:
```bash
npm run start:dev
```

## 📜 Scripts Disponíveis

```bash
npm run build          # Build do projeto para produção
npm run format         # Formata o código com Prettier
npm run start          # Inicia o servidor
npm run start:dev      # Inicia em modo watch (desenvolvimento)
npm run start:debug    # Inicia em modo debug
npm run start:prod     # Inicia o servidor de produção
npm run lint           # Executa o ESLint e corrige erros
npm run test           # Executa testes unitários
npm run test:watch     # Executa testes em modo watch
npm run test:cov       # Executa testes com coverage
npm run test:e2e       # Executa testes e2e
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

- **users**: Usuários do sistema com autenticação
- **scripts**: Scripts shell gerenciados pelo sistema
- **executions**: Histórico de execuções dos scripts
- **settings**: Configurações globais do sistema
- **organizations**: Organizações/empresas

### Status de Execução

- `PENDING` - Aguardando execução
- `RUNNING` - Em execução
- `SUCCESS` - Execução concluída com sucesso
- `FAILED` - Execução falhou

## 🔌 API Endpoints

### Autenticação
- `POST /auth/login` - Login de usuário
- `POST /auth/register` - Registro de novo usuário

### Scripts
- `GET /scripts` - Listar todos os scripts
- `GET /scripts/:id` - Obter script por ID
- `POST /scripts` - Criar novo script
- `PUT /scripts/:id` - Atualizar script
- `DELETE /scripts/:id` - Deletar script
- `PATCH /scripts/:id/deactivate` - Desativar script

### Execuções
- `POST /scripts/:id/execute` - Executar um script

## 📁 Estrutura do Projeto

```
isy-one/
├── src/
│   ├── domain/              # Camada de domínio (DDD)
│   │   ├── execution/       # Entidade de execução
│   │   │   ├── application/ # Casos de uso e repositórios
│   │   │   └── enterprise/  # Regras de negócio
│   │   ├── scripts/         # Entidade de scripts
│   │   │   ├── application/ # Casos de uso e repositórios
│   │   │   └── enterprise/  # Regras de negócio
│   │   └── user/            # Entidade de usuários
│   ├── infra/               # Camada de infraestrutura
│   │   ├── auth/           # Implementação de autenticação
│   │   ├── database/       # Configuração do Prisma
│   │   ├── env/            # Variáveis de ambiente
│   │   └── http/           # Camada HTTP (controllers)
│   │       ├── controllers/ # Controladores REST
│   │       ├── pipes/       # Pipes de validação
│   │       └── shell/       # Utilitários de shell
│   ├── generated/          # Código gerado (Prisma)
│   ├── app.module.ts       # Módulo raiz
│   └── main.ts             # Entry point da aplicação
├── prisma/                 # Schema e migrações do Prisma
├── data/                   # Diretório de dados
├── docker-compose.yml      # Configuração Docker
├── Dockerfile              # Imagem Docker
└── tsconfig.json           # Configuração TypeScript
```

## 🏗️ Arquitetura

O projeto segue os princípios de **Domain-Driven Design (DDD)** com separação clara entre:

- **Domain Layer**: Contém as regras de negócio e entidades do domínio
- **Infrastructure Layer**: Implementações técnicas como banco de dados, HTTP, autenticação
- **Application Layer**: Casos de uso que orquestram as operações

## 🔧 Comandos Prisma

```bash
npx prisma migrate dev          # Criar e aplicar nova migração
npx prisma migrate deploy       # Aplicar migrações em produção
npx prisma studio               # Abrir Prisma Studio (GUI)
npx prisma generate             # Gerar Prisma Client
npx prisma db seed              # Popular banco com dados de exemplo
```

## 🧪 Testes

### Testes Unitários
```bash
npm run test
```

### Testes E2E
```bash
npm run test:e2e
```

### Coverage
```bash
npm run test:cov
```

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação. Para acessar as rotas protegidas:

1. Faça login em `/auth/login` para obter o token
2. Inclua o token no header `Authorization`: `Bearer <token>`

## 📝 Exemplo de Uso

### Criar um Script
```bash
curl -X POST http://localhost:3000/scripts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Backup Database",
    "description": "Executa backup do banco de dados",
    "path": "/scripts/backup.sh"
  }'
```

### Executar um Script
```bash
curl -X POST http://localhost:3000/scripts/{id}/execute \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "parameters": {
      "database": "mydb"
    }
  }'
```

## 🐳 Docker

### Build da Imagem
```bash
docker build -t isy-one .
```

### Executar com Docker Compose
```bash
docker-compose up -d
```

## 📦 Deploy

Para produção:

1. Build do projeto:
```bash
npm run build
```

2. Execute em modo produção:
```bash
npm run start:prod
```

Ou use a imagem Docker:
```bash
docker run -p 3000:3000 isy-one
```

## 📝 Licença

Este projeto é privado e propriedade da Clueroi.

## 🤝 Contribuindo

Este é um projeto de desenvolvimento interno. Siga as práticas estabelecidas pela equipe.

## 📞 Suporte

