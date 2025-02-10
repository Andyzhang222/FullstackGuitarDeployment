import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import dotenv from "dotenv";

dotenv.config();

const poolData = {
  UserPoolId: process.env.USER_POOL_ID as string,
  ClientId: process.env.CLIENT_ID as string,
};

const userPool = new CognitoUserPool(poolData);

/**
 * 获取当前的 Cognito 用户对象
 */
export const getCognitoUser = (): CognitoUser | null => {
  const storedUser = localStorage.getItem("cognitoUser");
  if (!storedUser) return null;

  return new CognitoUser({
    Username: storedUser,
    Pool: userPool,
  });
};