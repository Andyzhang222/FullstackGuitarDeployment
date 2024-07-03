import express from 'express';
import dotenv from 'dotenv';
import './server';

// 初始化环境变量
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// 中间件
app.use(express.json());

// 基本路由
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});