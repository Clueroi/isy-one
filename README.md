# ISY One - Hackaton FMU 2026

# Script Management and Execution System

A script management and execution system built with **NestJS**, enabling shell script management, asynchronous execution, and execution result monitoring.

## 🚀 Technologies Used

### Backend
- **NestJS 11.0.1** - Progressive Node.js framework
- **Prisma 7.8.0** - Type-safe ORM for TypeScript
- **PostgreSQL** - Relational database
- **Passport** - Authentication middleware
- **JWT** - Token-based authentication
- **Zod 4.4.3** - Schema validation
- **Zod Validation Error** - Validation error handling

### Development Tools
- **TypeScript 5.7.3** - Static typing
- **Jest 30.0.0** - Testing framework
- **ESLint 9.18.0** - Code linting
- **Prettier 3.4.2** - Code formatting
- **Docker** - Containerization

## 📋 Features

- **Script Management**: Create, read, update, and delete shell scripts
- **Script Execution**: Asynchronous shell script execution with monitoring
- **Execution History**: Complete execution logs with status, stdout, and stderr
- **JWT Authentication**: Secure token-based authentication
- **User Management**: User registration and authentication
- **Organizations**: Multi-organization support
- **Settings**: Global system configuration
- **DDD Architecture**: Domain-Driven Design with clear layer separation
- **Clean Architecture**: Separation of concerns and responsibilities

## 🛠️ Prerequisites

- Node.js 20+
- PostgreSQL (or Docker Compose)
- npm, yarn, or pnpm

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd isy-one
```

2. Install dependencies:

```bash
npm install
```

3. Configure the environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/isy_one"
PORT=3000
JWT_SECRET=your-secret-key
```

## 🚀 Running the Project

### Using Docker Compose (Recommended)

1. Start PostgreSQL:

```bash
docker-compose up -d
```

2. Run Prisma migrations:

```bash
npx prisma migrate dev
```

3. Start the development server:

```bash
npm run start:dev
```

### Without Docker

1. Make sure PostgreSQL is running locally.
2. Configure the `DATABASE_URL` in the `.env` file.
3. Run the migrations:

```bash
npx prisma migrate dev
```

4. Start the server:

```bash
npm run start:dev
```

## 📜 Available Scripts

```bash
npm run build          # Build the project for production
npm run format         # Format the code with Prettier
npm run start          # Start the application
npm run start:dev      # Start in development (watch) mode
npm run start:debug    # Start in debug mode
npm run start:prod     # Start the production server
npm run lint           # Run ESLint and fix issues
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
npm run test:e2e       # Run end-to-end tests
```

## 🗄️ Database Structure

### Main Tables

- **users**: Authenticated system users
- **scripts**: Shell scripts managed by the system
- **executions**: Script execution history
- **settings**: Global system settings
- **organizations**: Organizations/companies

### Execution Status

- `PENDING` - Waiting for execution
- `RUNNING` - Currently running
- `SUCCESS` - Execution completed successfully
- `FAILED` - Execution failed

## 🔌 API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - Register a new user

### Scripts

- `GET /scripts` - List all scripts
- `GET /scripts/:id` - Get a script by ID
- `POST /scripts` - Create a new script
- `PUT /scripts/:id` - Update a script
- `DELETE /scripts/:id` - Delete a script
- `PATCH /scripts/:id/deactivate` - Deactivate a script

### Executions

- `POST /scripts/:id/execute` - Execute a script

## 📁 Project Structure

```text
isy-one/
├── src/
│   ├── domain/
│   │   ├── execution/
│   │   │   ├── application/
│   │   │   └── enterprise/
│   │   ├── scripts/
│   │   │   ├── application/
│   │   │   └── enterprise/
│   │   └── user/
│   ├── infra/
│   │   ├── auth/
│   │   ├── database/
│   │   ├── env/
│   │   └── http/
│   │       ├── controllers/
│   │       ├── pipes/
│   │       └── shell/
│   ├── generated/
│   ├── app.module.ts
│   └── main.ts
├── prisma/
├── data/
├── docker-compose.yml
├── Dockerfile
└── tsconfig.json
```

## 🏗️ Architecture

The project follows **Domain-Driven Design (DDD)** principles with a clear separation between:

- **Domain Layer**: Contains business rules and domain entities.
- **Application Layer**: Orchestrates business use cases.
- **Infrastructure Layer**: Handles technical implementations such as the database, HTTP layer, and authentication.

## 🔧 Prisma Commands

```bash
npx prisma migrate dev      # Create and apply a new migration
npx prisma migrate deploy   # Apply migrations in production
npx prisma studio           # Open Prisma Studio (GUI)
npx prisma generate         # Generate Prisma Client
npx prisma db seed          # Seed the database
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### End-to-End Tests

```bash
npm run test:e2e
```

### Coverage

```bash
npm run test:cov
```

## 🔐 Authentication

The system uses **JWT (JSON Web Tokens)** for authentication.

To access protected endpoints:

1. Authenticate through `/auth/login`.
2. Include the token in the `Authorization` header:

```text
Authorization: Bearer <token>
```

## 📝 Usage Examples

### Create a Script

```bash
curl -X POST http://localhost:3000/scripts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Database Backup",
    "description": "Runs a database backup",
    "path": "/scripts/backup.sh"
  }'
```

### Execute a Script

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

### Build the Image

```bash
docker build -t isy-one .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

## 📦 Deployment

For production:

1. Build the project:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start:prod
```

Or run using Docker:

```bash
docker run -p 3000:3000 isy-one
```

## 📝 License

This project is private and owned by **Clueroi**.

## 🤝 Contributing

This is an internal development project. Please follow the team's established standards and best practices.
