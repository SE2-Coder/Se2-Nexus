# Se2 Brain - Backend en Go

Backend de alto rendimiento construido en Go con PostgreSQL.

## Estructura del Proyecto

```
.
├── se2-brain/          # Backend en Go
│   ├── cmd/            # Punto de entrada
│   ├── internal/       # Lógica de negocio
│   ├── Dockerfile      # Imagen del backend
│   └── go.mod
├── database/           # PostgreSQL
│   ├── init/           # Scripts SQL de inicialización
│   │   └── 01-schema.sql
│   └── Dockerfile      # Imagen de PostgreSQL
├── docker-compose.yml  # Orquestación completa
└── .env.example        # Template de variables
```

## Despliegue Local

```bash
# 1. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus valores

# 2. Levantar todo el stack
docker-compose up -d

# 3. Verificar
curl http://localhost:8080/health
```

## Despliegue en Dokploy

1. **Crear aplicación tipo "Docker Compose"**
2. **Configurar:**
   - Repository: `Se2-Nexus`
   - Branch: `main`
   - Compose File: `docker-compose.yml`
3. **Variables de entorno:**
   - `DB_PASSWORD`: [tu-password-segura]
   - `JWT_SECRET`: [tu-secret-de-32-chars]
4. **Deploy**

## API Endpoints

- `GET /health` - Health check
- `POST /api/register` - Registro de usuario
- `POST /api/login` - Login (retorna JWT)

## Stack Tecnológico

- **Backend:** Go 1.22 + Gin
- **Database:** PostgreSQL 16
- **Auth:** JWT + Bcrypt
- **Security:** AES-256-GCM
- **2FA:** TOTP (RFC 6238)
