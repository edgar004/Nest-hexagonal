#!/bin/sh
# wait-for-postgres.sh

set -e
shift
cmd="$@"

until PGPASSWORD="hexapp" psql -h "hexapp_db" -U "hexapp_admin" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
sh -c "npm run migrate && npm run seed"
