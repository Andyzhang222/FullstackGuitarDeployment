# 使用 Node.js 官方镜像作为基础镜像
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock 文件
COPY package*.json yarn.lock ./

# 安装依赖
RUN yarn install --frozen-lockfile --production

# 复制项目文件
COPY . .

# 使用更小的基础镜像来运行应用
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制构建阶段的依赖和代码
COPY --from=build /app /app

# 暴露端口
EXPOSE 5001

# 启动服务
CMD ["yarn", "start"]