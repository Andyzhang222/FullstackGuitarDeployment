#!/bin/bash

# 启动前端
(cd frontend && yarn start) &
FRONTEND_PID=$!

# 启动后端
(cd backend && yarn dev) &
BACKEND_PID=$!

# 捕捉退出信号以停止前后端服务
trap 'kill $FRONTEND_PID $BACKEND_PID' EXIT

# 等待所有后台进程完成
wait $FRONTEND_PID $BACKEND_PID