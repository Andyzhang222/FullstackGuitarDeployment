# 使用 Node.js 官方镜像作为基础镜像
FROM node:16

# 创建应用目录
WORKDIR /app

# 复制 package.json 和 yarn.lock 文件
COPY package*.json ./

# 安装依赖
RUN yarn install

# 复制项目文件
COPY . .

# 构建项目
RUN yarn build

# 暴露端口
EXPOSE 5001

# 启动服务
CMD ["yarn", "start"]