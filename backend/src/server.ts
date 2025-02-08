import express from "express";
import App from "./app";
import * as bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

// 导入所有控制器
import HomeController from "./controllers/home.controller";
import AuthController from "./controllers/auth.controller";
import ProtectedController from "./controllers/protected.controller";
import ProductController from "./controllers/ProductController";
import CartController from "./controllers/CartController";
import RefreshTokenController from "./controllers/refreshToken.controller"; // ✅ 新增 Refresh Token 控制器

dotenv.config();

const app = new App({
  port: 5001,
  controllers: [
    new HomeController(),
    new AuthController(),
    new ProtectedController(),
    new ProductController(),
    new CartController(),
    new RefreshTokenController(), // ✅ 添加 Refresh Token 控制器
  ],
  middleWares: [
    cors(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
  ],
});

app.listen();