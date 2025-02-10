import * as express from "express";
import { Request, Response } from "express";

class HomeController {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/", this.healthCheck);
  }

  // 📌 健康检查 API
  healthCheck = (req: Request, res: Response) => {
    res.status(200).json({
      status: "OK",
      message: "API is running",
      version: "1.0.0", // 📌 可修改为你的 API 版本号
      timestamp: new Date().toISOString(),
    });
  };
}

export default HomeController;