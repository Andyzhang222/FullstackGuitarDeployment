import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

// 初始化环境变量
dotenv.config();

const app = express();

// 中间件
app.use(express.json());

// 路由
app.use('/auth', authRoutes);

export default app;