import { Request, Response, NextFunction } from 'express';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

let pems: { [key: string]: any } = {}

class AuthMiddleware {

  private poolRegion: string = process.env.POOL_REGION;
  private userPoolId: string = process.env.USER_POOL_ID;

  constructor() {
    this.setUp()
  }

  private verifyToken(req: Request, resp: Response, next: NextFunction): void {
    const { token } = req.body;
    console.log("Original Token:", token);
    if (!token) {
      resp.status(401).end();
      return;
    }

    let decodedJwt: any = jwt.decode(token, { complete: true });
    if (decodedJwt === null) {
      resp.status(401).end();
      return;
    }
    console.log("Decoded Token:", decodedJwt);
    let kid = decodedJwt.header.kid;
    let pem = pems[kid];
    console.log(pem);
    if (!pem) {
      resp.status(401).end();
      return;
    }
    jwt.verify(token, pem, function (err: any, payload: any) {
      if (err) {
        resp.status(401).end();
        return;
      } else {
        next();
      }
    });
  }

  private async setUp() {
    const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

    try {
      const response = await fetch(URL);
      if (response.status !== 200) {
        throw 'request not successful'
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
      console.log("got PEMS");
    } catch (error) {
      console.log(error);
      console.log('Error! Unable to download JWKs');
    }
  }
}

export default AuthMiddleware;