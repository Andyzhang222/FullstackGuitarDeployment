// import express, { Request, Response } from 'express';
// import { check, validationResult } from 'express-validator';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from './User';  // 确保路径正确

// const router = express.Router();

// // 登录路由
// router.post('/login', [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists()
// ], async (req: Request, res: Response) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//         let user = await User.findOne({ where: { email } });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }

//         const payload = {
//             user: {
//                 id: user.id
//             }
//         };

//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// export default router;