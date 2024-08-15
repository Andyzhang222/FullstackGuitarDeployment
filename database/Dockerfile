FROM postgres:latest

# 复制备份文件到容器中
COPY ./GuitarDatabase.backup /docker-entrypoint-initdb.d/

# 添加初始化脚本到容器中
COPY init-db.sh /docker-entrypoint-initdb.d/

# 确保脚本有执行权限
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh