# 使用 Node.js 官方镜像作为基础镜像
FROM node:18

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

# 使用 serve 提供静态文件服务
RUN yarn global add serve

# 暴露端口
EXPOSE 3000

# 启动服务
CMD ["serve", "-s", "build"]