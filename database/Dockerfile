FROM postgres:16-alpine

# Configuración de salud y performance
ENV POSTGRES_INITDB_ARGS="--encoding=UTF8 --locale=en_US.UTF-8"

# Copiar scripts de inicialización
COPY init/*.sql /docker-entrypoint-initdb.d/

# Exponer puerto
EXPOSE 5432
