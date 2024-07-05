import * as express from 'express'
import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator';
import Cognito from '../services/cognito.service';
import { UserService } from '../services/user.service';
import cors from 'cors';



class AuthController {
    public path = '/auth'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
      this.router.use(cors());  // 添加CORS中间件

        this.router.post('/signup', this.validateBody('signUp'), this.signUp)
        this.router.post('/signin', this.validateBody('signIn'), this.signIn)
        this.router.post('/verify', this.validateBody('verify'), this.verify)
        this.router.post('/forgot-password', this.validateBody('forgotPassword'), this.forgotPassword)
        this.router.post('/confirm-password', this.validateBody('confirmPassword'), this.confirmPassword)
    }


    // Signup new user
// Signup new user
signUp = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    console.log('没有收到任何数据');
    return res.status(400).json({ message: '没有收到任何数据' });
  }

  console.log('Received request body:', req.body);

  const { email, password } = req.body;

  let userAttr = [
    { Name: 'email', Value: email },
    { Name: 'gender', Value: '' },
    { Name: 'birthdate', Value: '' },
    { Name: 'name', Value: '' },
    { Name: 'family_name', Value: '' }
  ];

  let cognitoService = new Cognito();
  cognitoService.signUpUser(email, password, userAttr)
    .then(success => {
      if (success) {
        console.log('User registration successful');
        res.status(200).end();
      } else {
        console.log('User registration failed');
        res.status(400).end();
      }
    })
    .catch(err => {
      console.error('Error during user registration:', err);
      res.status(500).end();
    });
}


    // Use username and password to authenticate user
    // signIn = (req: Request, res: Response) => {
    //   const result = validationResult(req);
    //   if (!result.isEmpty()) {
    //     return res.status(422).json({ errors: result.array() });
    //   }
    //  console.log(req.body);


    //   const { username, password } = req.body;
    //   let cognitoService = new Cognito();
    //   cognitoService.signInUser(username, password)
    //     .then(success => {
    //       success ? res.status(200).end() : res.status(400).end()
    //     })
    // }

    // Use username and password to authenticate user
// Use username and password to authenticate user
signIn = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }
  console.log(req.body);

  const { username, password } = req.body;
  let cognitoService = new Cognito();
  cognitoService.signInUser(username, password)
    .then(async (tokens) => {
      if (tokens) {
        // 从ID Token中获取用户信息
        const userInfo = cognitoService.getUserInfoFromToken(tokens.AuthenticationResult.IdToken);
        const userService = new UserService();
        // 检查并创建用户
        await userService.createUserIfNotExists(userInfo.sub, userInfo.email);

        // 将 token 发送给前端
        res.status(200).json(tokens.AuthenticationResult);
      } else {
        // 如果 tokens 为空，抛出一个错误，以便在 catch 块中处理
        throw new Error('InvalidToken');
      }
    })
    .catch(err => {
      console.error('Error object:', err,"           1111111end"); // 打印错误对象
      // 处理 Cognito 错误信息
      console.error("test 111111111111111111111" + err.code); // 打印详细错误信息
      console.error("test messege111111111111111111111" + err.messege); // 打印详细错误信息


      let errorMessage = 'Login failed';
      if (err.code === 'UserNotConfirmedException') {
        errorMessage = 'User is not confirmed';
      } else if (err.code === 'NotAuthorizedException') {
        errorMessage = 'Incorrect username or password';
      } else if (err.code === 'UserNotFoundException') {
        errorMessage = 'User does not exist';
      } else if (err.message === 'InvalidToken') {
        errorMessage = 'Login failed. Please try again.'; // 这个信息可以自定义或省略
      } else {
        errorMessage = 'An unknown error occurred';
      }
      console.error(errorMessage,"the final decesion made that need send to front end"); // 打印详细错误信息

      res.status(400).json({ message: errorMessage });
    });
};


    // confirm signup account with code sent to email
    verify = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body)
      const { username, code } = req.body;

      let cognitoService = new Cognito();
      cognitoService.confirmSignUp(username, code)
        .then(success => {
          success ? res.status(200).end() : res.status(400).end()
        })
    }

    confirmPassword = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      const { username, password, code } = req.body;

      let cognitoService = new Cognito();
      cognitoService.confirmNewPassword(username, password, code)
        .then(success => {
          success ? res.status(200).end(): res.status(400).end()
        })
    }

    forgotPassword = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      const { username } = req.body;

      let cognitoService = new Cognito();
      cognitoService.forgotPassword(username)
        .then(success => {
          success ? res.status(200).end(): res.status(400).end()
        });
    }

    private validateBody(type: string) {
      switch (type) {
        case 'signUp':
          return [
            // body('username').notEmpty().isLength({min: 5}),
            body('email').notEmpty().normalizeEmail().isEmail(),
            body('password').isString().isLength({ min: 0}),
            // body('birthdate').exists().isISO8601(),
            // body('gender').notEmpty().isString(),
            // body('name').notEmpty().isString(),
            // body('family_name').notEmpty().isString()
          ]
        case 'signIn':
          return [
            body('username').notEmpty().isLength({min: 0}),
            body('password').isString().isLength({ min: 0}),
          ]
        case 'verify':
          return [
            body('username').notEmpty().isLength({min: 5}),
            body('code').notEmpty().isString().isLength({min: 6, max: 6})
          ]
        case 'forgotPassword':
          return [
            body('username').notEmpty().isLength({ min: 5}),
          ]
        case 'confirmPassword':
          return [
            body('password').exists().isLength({ min: 8}),
            body('username').notEmpty().isLength({ min: 5}),
            body('code').notEmpty().isString().isLength({min: 6, max: 6})
          ]
      }
    }
}

export default AuthController