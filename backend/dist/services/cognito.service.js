"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
class Cognito {
  constructor() {
    this.config = {
      apiVersion: "2024-06-03",
      region: process.env.AWS_REGION,
    };
    this.secretHash = process.env.SECRET_HASH;
    this.clientId = process.env.CLIENT_ID;
    this.cognitoIdentity = new aws_sdk_1.default.CognitoIdentityServiceProvider(
      this.config
    );
  }
  signUpUser(username, password, userAttr) {
    return __awaiter(this, void 0, void 0, function* () {
      const params = {
        ClientId: this.clientId,
        Password: password,
        Username: username,
        SecretHash: this.hashSecret(username),
        UserAttributes: userAttr,
      };
      try {
        const data = yield this.cognitoIdentity.signUp(params).promise();
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    });
  }
  signInUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
      var params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: this.clientId,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
          SECRET_HASH: this.hashSecret(username),
        },
      };
      try {
        let data = yield this.cognitoIdentity.initiateAuth(params).promise();
        console.log(data);
        if (data.AuthenticationResult) {
          const decodedAccessToken = jsonwebtoken_1.default.decode(
            data.AuthenticationResult.AccessToken
          );
          const decodedIdToken = jsonwebtoken_1.default.decode(
            data.AuthenticationResult.IdToken
          );
          const decodedRefreshToken = jsonwebtoken_1.default.decode(
            data.AuthenticationResult.RefreshToken
          );
          console.log("Decoded Access Token: ", decodedAccessToken);
          console.log("Decoded ID Token: ", decodedIdToken);
          console.log("Decoded Refresh Token: ", decodedRefreshToken);
        }
        return data;
      } catch (error) {
        console.log(error);
        console.log(error.code, "         test error code ");
        throw error;
      }
    });
  }
  confirmSignUp(username, code) {
    return __awaiter(this, void 0, void 0, function* () {
      var params = {
        ClientId: this.clientId,
        ConfirmationCode: code,
        Username: username,
        SecretHash: this.hashSecret(username),
      };
      try {
        const cognitoResp = yield this.cognitoIdentity
          .confirmSignUp(params)
          .promise();
        console.log(cognitoResp);
        return true;
      } catch (error) {
        console.log("error", error);
        return false;
      }
    });
  }
  forgotPassword(username) {
    return __awaiter(this, void 0, void 0, function* () {
      var params = {
        ClientId: this.clientId,
        Username: username,
        SecretHash: this.hashSecret(username),
      };
      try {
        const data = yield this.cognitoIdentity
          .forgotPassword(params)
          .promise();
        console.log(data);
        return { success: true };
      } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
      }
    });
  }
  confirmNewPassword(username, password, code) {
    return __awaiter(this, void 0, void 0, function* () {
      var params = {
        ClientId: this.clientId,
        ConfirmationCode: code,
        Password: password,
        Username: username,
        SecretHash: this.hashSecret(username),
      };
      try {
        const data = yield this.cognitoIdentity
          .confirmForgotPassword(params)
          .promise();
        console.log(data);
        return { success: true };
      } catch (error) {
        console.log(error);
        return { success: false, message: error.message, code: error.code };
      }
    });
  }
  hashSecret(username) {
    return crypto_1.default
      .createHmac("SHA256", this.secretHash)
      .update(username + this.clientId)
      .digest("base64");
  }
  getUserInfoFromToken(token) {
    const decodedToken = jsonwebtoken_1.default.decode(token);
    const sub =
      decodedToken === null || decodedToken === void 0
        ? void 0
        : decodedToken.sub;
    const email =
      decodedToken === null || decodedToken === void 0
        ? void 0
        : decodedToken.email;
    return { sub, email };
  }
  verifyCode(username, code) {
    return __awaiter(this, void 0, void 0, function* () {
      const params = {
        ClientId: this.clientId,
        ConfirmationCode: code,
        Username: username,
        SecretHash: this.hashSecret(username),
      };
      console.log("Params sent to AWS Cognito for verifyCode:", params);
      try {
        const data = yield this.cognitoIdentity
          .confirmForgotPassword(params)
          .promise();
        console.log("AWS Cognito response:", data);
        return true;
      } catch (error) {
        console.log("Error in verifyCode:", error);
        return false;
      }
    });
  }
}
exports.default = Cognito;
//# sourceMappingURL=cognito.service.js.map
