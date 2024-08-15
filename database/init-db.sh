#!/bin/bash
set -e

# 删除现有数据库并重新创建
echo "Dropping existing database..."
psql -U $POSTGRES_USER -c "DROP DATABASE IF EXISTS $POSTGRES_DB;"

echo "Creating new database..."
psql -U $POSTGRES_USER -c "CREATE DATABASE $POSTGRES_DB;"

# 恢复备份
echo "Restoring database from backup..."
pg_restore -U $POSTGRES_USER -d $POSTGRES_DB /docker-entrypoint-initdb.d/GuitarDatabase.backup

echo "Database restore complete."