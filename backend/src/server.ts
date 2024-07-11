import App from './app';
import * as bodyParser from 'body-parser';
import HomeController from './controllers/home.controller';
import AuthController from './controllers/auth.controller';
import ProtectedController from './controllers/protected.controller';
import dotenv from 'dotenv';
import cors from 'cors'; // 导入cors中间件

dotenv.config();

const app = new App({
    port: 5001,
    controllers: [
        new HomeController(),
        new AuthController(),
        new ProtectedController()
    ],
    middleWares: [
        cors(), // 添加cors中间件
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ]
});

// 使用 authRoutes
// app.app.use('/auth', authRoutes);
app.listen();