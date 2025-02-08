"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
class Cognito {
    constructor() {
        this.config = {
            apiVersion: "2024-06-03",
            region: process.env.AWS_REGION,
        };
        this.secretHash = process.env.SECRET_HASH;
        this.clientId = process.env.CLIENT_ID;
        this.cognitoIdentity = new aws_sdk_1.default.CognitoIdentityServiceProvider(this.config);
    }
    async signUpUser(username, password, userAttr) {
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
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async signInUser(username, password) {
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
                const decodedAccessToken = jsonwebtoken_1.default.decode(data.AuthenticationResult.AccessToken);
                const decodedIdToken = jsonwebtoken_1.default.decode(data.AuthenticationResult.IdToken);
                const decodedRefreshToken = jsonwebtoken_1.default.decode(data.AuthenticationResult.RefreshToken);
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
        }
        catch (error) {
            console.log(error);
            console.log(error.code, "         test error code ");
            throw error;
        }
    }
    async confirmSignUp(username, code) {
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
        }
        catch (error) {
            console.log("error", error);
            return false;
        }
    }
    async forgotPassword(username) {
        var params = {
            ClientId: this.clientId /* required */,
            Username: username /* required */,
            SecretHash: this.hashSecret(username),
        };
        try {
            const data = await this.cognitoIdentity.forgotPassword(params).promise();
            console.log(data);
            return { success: true };
        }
        catch (error) {
            console.log(error);
            return { success: false, message: error.message };
        }
    }
    async confirmNewPassword(username, password, code) {
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
            return { success: true };
        }
        catch (error) {
            console.log(error);
            return { success: false, message: error.message, code: error.code };
        }
    }
    hashSecret(username) {
        return crypto_1.default
            .createHmac("SHA256", this.secretHash)
            .update(username + this.clientId)
            .digest("base64");
    }
    getUserInfoFromToken(token) {
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const sub = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.sub;
        const email = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.email;
        return { sub, email };
    }
    // 在 cognito.service.ts 中
    async verifyCode(username, code) {
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
        }
        catch (error) {
            console.log("Error in verifyCode:", error);
            return false;
        }
    }
}
exports.default = Cognito;
//# sourceMappingURL=cognito.service.js.map