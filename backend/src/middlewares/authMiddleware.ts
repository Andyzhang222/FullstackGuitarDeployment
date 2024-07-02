import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // 验证令牌并解码用户信息
    const decodedUser = {}; // 根据实际情况解码
    (req as any).user = decodedUser; // 使用类型断言来设置 req.user

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default verifyToken;