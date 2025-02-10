import { Request, Response, NextFunction } from "express";
import jwkToPem from "jwk-to-pem";
import jwt, { JwtPayload } from "jsonwebtoken";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

let pems: { [key: string]: string } = {};

class AuthMiddleware {
  private poolRegion: string = process.env.POOL_REGION || "";
  private userPoolId: string = process.env.USER_POOL_ID || "";

  constructor() {
    this.setUpJWKs(); // 预加载 Cognito 公钥
  }

  /**
   * ✅ 验证 Access Token，并显示 Token 过期时间
   */
  public verifyToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1]; // 提取 Bearer Token
    console.log("🔹 Incoming Request Token:", token);

    if (!token) {
      console.warn("❌ Token is missing");
      res.status(401).json({ message: "Token is missing or expired" });
      return;
    }

    const decodedJwt = jwt.decode(token, { complete: true }) as jwt.Jwt | null;
    console.log("🔹 Decoded JWT:", decodedJwt);

    if (!decodedJwt || !decodedJwt.header.kid) {
      console.warn("❌ Invalid token format (decoding failed)");
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const pem = pems[decodedJwt.header.kid]; // 获取对应的 PEM 密钥
    if (!pem) {
      console.warn("❌ Token verification failed (PEM not found)");
      res.status(401).json({ message: "Token verification failed" });
      return;
    }

    // 🕒 获取 JWT 过期时间
    const payload = decodedJwt.payload as JwtPayload; // ✅ 显式声明类型
    const exp = payload.exp; // Expiration Time (UNIX timestamp)
    const now = Math.floor(Date.now() / 1000); // 当前时间 (秒)
    const remainingTime = exp ? exp - now : 0; // 计算剩余时间

    if (exp) {
      const expiryDate = new Date(exp * 1000).toLocaleString();
      console.log(`🕒 Token Expiration Time: ${expiryDate} (剩余 ${remainingTime} 秒)`);
    }

    // 🔍 通过 AWS Cognito 公钥验证 Token 是否有效
    jwt.verify(token, pem, (err, payload: any) => {
      if (err) {
        console.warn("❌ Token verification error:", err.name);

        if (err.name === "TokenExpiredError") {
          console.warn("⏳ Token has expired!");
          res.status(401).json({ message: "Token expired" });
          return;
        }

        res.status(401).json({ message: "Token is invalid" });
        return;
      }

      console.log("✅ Token is valid! User ID:", payload.sub);
      req.userId = payload.sub; // ✅ 绑定用户 ID
      next(); // 继续执行后续中间件
    });
  }

  /**
   * ✅ 预加载 Cognito JWKs（JSON Web Key Sets）
   */
  private async setUpJWKs() {
    const url = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

    try {
      const response = await fetch(url);
      if (response.status !== 200) {
        throw new Error("❌ Failed to fetch JWKs from Cognito");
      }

      const { keys } = await response.json();
      keys.forEach((key: any) => {
        const jwk = { kty: key.kty, n: key.n, e: key.e };
        const pem = jwkToPem(jwk); // 将 JWK 转换为 PEM
        pems[key.kid] = pem;
      });

      console.log("✅ AWS Cognito JWKs successfully loaded");
    } catch (error) {
      console.error("❌ Failed to load Cognito JWKs", error);
    }
  }
}

export default AuthMiddleware;