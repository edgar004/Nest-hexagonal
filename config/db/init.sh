#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE DATABASE hexapp_db;
  CREATE USER hexapp_admin WITH SUPERUSER PASSWORD 'hexapp';
  GRANT ALL PRIVILEGES ON DATABASE hexapp_db TO hexapp_admin;
EOSQL
