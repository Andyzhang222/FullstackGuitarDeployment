import express from "express";
import { Application } from "express";

const corsOptions = {
  origin: "http://localhost:3000", // 允许的前端 URL
  credentials: true, // 允许携带 Cookie（如果你的身份验证需要）
  allowedHeaders: ["Content-Type", "Authorization"], // 允许的头部
  methods: ["GET", "POST", "PUT", "DELETE"], // 允许的请求方法
};


class App {
  public app: Application;
  public port: number;
  public host: string;

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;
    this.host = process.env.HOST || "0.0.0.0"; // 默认为 0.0.0.0，允许外部访问

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
  }

  private middlewares(middleWares: {
    cors(corsOptions), // ✅ 确保使用 corsOptions
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach((middleWare) => {
      console.log(
        `Applying middleware: ${middleWare.name || "anonymous middleware"}`
      );
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
    
  }) {
    controllers.forEach((controller) => {
      console.log(`Initializing route: ${controller.path}`);
      this.app.use(controller.path, controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, this.host, () => {
      console.log(`App listening on http://${this.host}:${this.port}`);
    });
  }

  
}

export default App;
