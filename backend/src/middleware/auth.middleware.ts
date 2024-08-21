import { Request, Response, NextFunction } from 'express';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

let pems: { [key: string]: any } = {};

class AuthMiddleware {
  private poolRegion: string = process.env.POOL_REGION;
  private userPoolId: string = process.env.USER_POOL_ID;

  constructor() {
    this.setUp();
  }

  public verifyToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('Authorization token:', token); // 调试信息

    if (!token) {
      console.log('Token is missing'); // 调试信息
      res.status(401).send('Token is missing');
      return;
    }

    const decodedJwt: any = jwt.decode(token, { complete: true });
    console.log('Decoded JWT:', decodedJwt); // 调试信息

    if (!decodedJwt) {
      console.log('Token is invalid (decoding failed)'); // 调试信息
      res.status(401).send('Token is invalid');
      return;
    }

    const kid = decodedJwt.header.kid;
    const pem = pems[kid];
    console.log('PEM used for verification:', pem); // 调试信息

    if (!pem) {
      console.log('Token is invalid (no matching PEM)'); // 调试信息
      res.status(401).send('Token is invalid');
      return;
    }

    jwt.verify(token, pem, (err: any, payload: any) => {
      if (err) {
        console.log('Token is invalid (verification failed)', err); // 调试信息
        res.status(401).send('Token is invalid');
        return;
      }

      const userId = payload.sub;
      console.log('Extracted userId:', userId); // 调试信息
      req.body.userId = userId;
      next();
    });
  }

  private async setUp() {
    const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

    try {
      const response = await fetch(URL);
      if (response.status !== 200) {
        throw new Error('Request not successful');
      }
      const data = await response.json();
      const { keys } = data;
      for (let i = 0; i < keys.length; i++) {
        const key_id = keys[i].kid;
        const modulus = keys[i].n;
        const exponent = keys[i].e;
        const key_type = keys[i].kty;
        const jwk = { kty: key_type, n: modulus, e: exponent };
        const pem = jwkToPem(jwk);
        pems[key_id] = pem;
      }
      console.log('PEMS loaded successfully');
    } catch (error) {
      console.error('Error! Unable to download JWKs', error);
    }
  }
}

export default AuthMiddleware;