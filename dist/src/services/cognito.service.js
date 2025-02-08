"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
class Cognito {
    constructor() {
        this.config = {
            apiVersion: "2016-04-18",
            region: "ca-central-1",
        };
        this.secretHash = "10j74r0nsekujafhd777t01omagltb34m16mvrb8e3v6rfop7ud3";
        this.clientId = "7lkobomofk4vsi2iktb0mdmaeq";
        this.cognitoIdentity = new aws_sdk_1.default.CognitoIdentityServiceProvider(this.config);
    }
    async signUpUser(username, password, userAttr) {
        var params = {
            ClientId: this.clientId /* required */,
            Password: password /* required */,
            Username: username /* required */,
            SecretHash: this.hashSecret(username),
            UserAttributes: userAttr,
        };
        try {
            const data = await this.cognitoIdentity.signUp(params).promise();
            console.log(data);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
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
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
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
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
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
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    hashSecret(username) {
        return crypto_1.default
            .createHmac("SHA256", this.secretHash)
            .update(username + this.clientId)
            .digest("base64");
    }
}
exports.default = Cognito;
//# sourceMappingURL=cognito.service.js.map