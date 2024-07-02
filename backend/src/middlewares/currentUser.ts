
import { Request, Response, NextFunction } from 'express';

const currentUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    next()
  }

  try {
    // 验证令牌并解码用户信息
    // const userId = parse(accessToken).sub
    // const user = Account.get(userId)

    // res.locals.user= user

   
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default currentUser;