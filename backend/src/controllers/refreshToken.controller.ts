import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class RefreshTokenController {
  public path = "/auth";
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post("/refresh", this.refreshToken);
  }

  public refreshToken = (req: Request, res: Response): Response => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid refresh token" });
      }

      const userId = (decoded as jwt.JwtPayload).sub;
      const newAccessToken = jwt.sign(
        { sub: userId },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "1h" }
      );

      return res.json({ accessToken: newAccessToken });
    });

    return res.status(500).json({ error: "Unexpected error occurred" });
  };
}

export default RefreshTokenController;