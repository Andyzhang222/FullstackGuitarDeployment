import { Request, Response } from 'express';
import client from '../awsConfig';
import { GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';

export const verifyToken = async (req: Request, res: Response) => {
  const { accessToken } = req.body;

  try {
    const command = new GetUserCommand({ AccessToken: accessToken });
    const userInfo = await client.send(command);
    res.status(200).json({ message: 'Login successful', user: userInfo });
  } catch (error) {
    res.status(401).json({ message: 'Invalid tokens', error: (error as Error).message });
  }
};