import AWS from "aws-sdk";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
import { UserService } from "../services/user.service";

export default class Cognito {
  private config = {
    apiVersion: "2024-06-03",
    region: process.env.AWS_REGION,
  };

  private secretHash = process.env.SECRET_HASH;
  private clientId = process.env.CLIENT_ID;

  private cognitoIdentity;

  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
  }

  public async signUpUser(
    username: string,
    password: string,
    userAttr: Array<any>
  ): Promise<any> {
    const params = {
      ClientId: this.clientId /* required */,
      Password: password /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username),
      UserAttributes: userAttr,
    };
  
    try {
      const data = await this.cognitoIdentity.signUp(params).promise();
      console.log(data);
      // 返回注册信息，包括 UserSub
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  public async signInUser(username: string, password: string): Promise<any> {
    var params = {
      AuthFlow: "USER_PASSWORD_AUTH" /* required */,
      ClientId: this.clientId /* required */,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: this.hashSecret(username),
      },
    };

    try {
      let data = await this.cognitoIdentity.initiateAuth(params).promise();
      console.log(data);

      // Decode the tokens
      if (data.AuthenticationResult) {
        const decodedAccessToken = jwt.decode(
          data.AuthenticationResult.AccessToken
        );
        const decodedIdToken = jwt.decode(data.AuthenticationResult.IdToken);
        const decodedRefreshToken = jwt.decode(
          data.AuthenticationResult.RefreshToken
        );

        console.log("Decoded Access Token: ", decodedAccessToken);
        console.log("Decoded ID Token: ", decodedIdToken);
        console.log("Decoded Refresh Token: ", decodedRefreshToken);

        // // 从ID Token中获取用户信息
        // const userInfo = this.getUserInfoFromToken(data.AuthenticationResult.IdToken!);

        // // 创建 UserService 实例
        // const userService = new UserService();

        // // 检查并创建用户
        // await userService.createUserIfNotExists(userInfo.sub, userInfo.email);
      }

      return data; // 返回包含 AuthenticationResult 的对象
    } catch (error) {
      console.log(error);
      console.log(error.code, "         test error code ");
      throw error;
    }
  }

  public async confirmSignUp(username: string, code: string): Promise<boolean> {
    var params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    try {
      const cognitoResp = await this.cognitoIdentity
        .confirmSignUp(params)
        .promise();
      console.log(cognitoResp);
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

  public async forgotPassword(username): Promise<boolean> {
    var params = {
      ClientId: this.clientId /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username),
    };

    try {
      const data = await this.cognitoIdentity.forgotPassword(params).promise();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async confirmNewPassword(
    username: string,
    password: string,
    code: string
  ): Promise<boolean> {
    var params = {
      ClientId: this.clientId /* required */,
      ConfirmationCode: code /* required */,
      Password: password /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username),
    };

    try {
      const data = await this.cognitoIdentity
        .confirmForgotPassword(params)
        .promise();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private hashSecret(username: string): string {
    return crypto
      .createHmac("SHA256", this.secretHash)
      .update(username + this.clientId)
      .digest("base64");
  }

  getUserInfoFromToken(token: string): { sub: string; email: string } {
    const decodedToken = jwt.decode(token) as { [key: string]: any };
    const sub = decodedToken?.sub;
    const email = decodedToken?.email;
    return { sub, email };
  }

   // 在 cognito.service.ts 中
   public async verifyCode(username: string, code: string): Promise<boolean> {
    const params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    console.log("Params sent to AWS Cognito for verifyCode:", params);

    try {
      const data = await this.cognitoIdentity
        .confirmForgotPassword(params)
        .promise();
      console.log("AWS Cognito response:", data);
      return true;
    } catch (error) {
      console.log("Error in verifyCode:", error);
      return false;
    }
  }
}
