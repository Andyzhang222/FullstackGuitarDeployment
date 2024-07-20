import express from 'express';
import App from './app';
import * as bodyParser from 'body-parser';
import HomeController from './controllers/home.controller';
import AuthController from './controllers/auth.controller';
import ProtectedController from './controllers/protected.controller';
import ProductController from './controllers/ProductController'; // 导入 ProductController
import dotenv from 'dotenv';
import cors from 'cors'; // 导入cors中间件

dotenv.config();

const app = new App({
    port: 5001,
    controllers: [
        new HomeController(),
        new AuthController(),
        new ProtectedController(),
        new ProductController(), // 添加 ProductController
    ],
    middleWares: [
        cors(), // 添加cors中间件
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ]
});

app.listen();