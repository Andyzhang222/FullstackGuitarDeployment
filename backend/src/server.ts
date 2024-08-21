import express from "express";
import App from "./app";
import * as bodyParser from "body-parser";
import HomeController from "./controllers/home.controller";
import AuthController from "./controllers/auth.controller";
import ProtectedController from "./controllers/protected.controller";
import ProductController from "./controllers/ProductController";
import CartController from "./controllers/CartController"; // Import the CartController
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = new App({
  port: 5001,
  controllers: [
    new HomeController(),
    new AuthController(),
    new ProtectedController(),
    new ProductController(),
    new CartController(), // Add the CartController
  ],
  middleWares: [
    cors(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
  ],
});

app.listen();
