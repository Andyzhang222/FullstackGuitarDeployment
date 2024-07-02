import express from 'express';

const router = express.Router();

router.post('/token', (req, res) => {
  const { idToken, accessToken, refreshToken } = req.body;
  
  // 打印令牌到控制台
  console.log('ID Token:', idToken);
  console.log('Access Token:', accessToken);
  console.log('Refresh Token:', refreshToken);
  
  // 其他处理逻辑，比如存储令牌或验证令牌
  
  res.json({ message: 'Tokens received' });
});

export default router;