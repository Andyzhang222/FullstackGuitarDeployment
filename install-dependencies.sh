#!/bin/bash

# 进入前端目录并安装依赖项
echo "Installing frontend dependencies..."
cd frontend
yarn install  # 或 npm install

# 回到根目录
cd ..

# 进入后端目录并安装依赖项
echo "Installing backend dependencies..."
cd backend
yarn install  # 或 npm install

echo "All dependencies installed successfully."