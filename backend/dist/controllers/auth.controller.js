"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
const express = __importStar(require("express"));
const express_validator_1 = require("express-validator");
const cognito_service_1 = __importDefault(
  require("../services/cognito.service")
);
const user_service_1 = require("../services/user.service");
const cors_1 = __importDefault(require("cors"));
class AuthController {
  constructor() {
    this.path = "/auth";
    this.router = express.Router();
    this.checkEmail = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
          const userService = new user_service_1.UserService();
          const userExists = yield userService.checkEmailExists(email);
          if (userExists) {
            res.status(200).json({ exists: true });
          } else {
            res.status(404).json({ exists: false });
          }
        } catch (error) {
          res.status(500).json({ message: "Internal server error" });
        }
      });
    this.signUp = (req, res) => {
      const result = (0, express_validator_1.validationResult)(req);
      if (!result.isEmpty()) {
        console.log(result);
      }
      if (!req.body || Object.keys(req.body).length === 0) {
        console.log("没有收到任何数据");
        return res.status(400).json({ message: "没有收到任何数据" });
      }
      console.log("Received request body:", req.body);
      const { email, password } = req.body;
      let userAttr = [
        { Name: "email", Value: email },
        { Name: "gender", Value: "" },
        { Name: "birthdate", Value: "" },
        { Name: "name", Value: "" },
        { Name: "family_name", Value: "" },
      ];
      let cognitoService = new cognito_service_1.default();
      cognitoService
        .signUpUser(email, password, userAttr)
        .then((result) =>
          __awaiter(this, void 0, void 0, function* () {
            if (result) {
              console.log("User registration successful");
              const userSub = result.UserSub;
              console.log("UserSub:", userSub);
              try {
                const userService = new user_service_1.UserService();
                yield userService.createUserIfNotExists(userSub, email);
                res
                  .status(200)
                  .json({
                    message: "User registration and storage successful",
                  });
              } catch (err) {
                console.error("Error storing user information:", err);
                res.status(500).json({
                  message:
                    "User registration successful, but failed to store user information",
                });
              }
            } else {
              console.log("User registration failed");
              res.status(400).end();
            }
          })
        )
        .catch((err) => {
          console.error("Error during user registration:", err);
          console.error("Error code:", err.code);
          console.error("Error message:", err.message);
          let errorMessage = "Internal server error";
          let statusCode = 500;
          if (err.code === "UsernameExistsException") {
            errorMessage = "User already exists";
            statusCode = 400;
          } else if (
            err.code === "InvalidPasswordException" ||
            "InvalidParameterException"
          ) {
            errorMessage =
              "Password must be at least 8 characters, with one number, 1 special character, 1 uppercase, and 1 lowercase letter.";
            statusCode = 400;
          } else if (err.code === "NotAuthorizedException") {
            errorMessage = "Not authorized";
            statusCode = 400;
          } else if (err.code === "TooManyRequestsException") {
            errorMessage = "Too many requests, please try again later";
            statusCode = 429;
          } else if (
            err.code === "InvalidLambdaResponseException" ||
            err.code === "InvalidEmailRoleAccessPolicyException"
          )
            console.log("Sending error response:", {
              statusCode,
              errorMessage,
            });
          res.status(statusCode).json({ message: errorMessage });
        });
    };
    this.signIn = (req, res) => {
      const result = (0, express_validator_1.validationResult)(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body);
      const { username, password } = req.body;
      let cognitoService = new cognito_service_1.default();
      cognitoService
        .signInUser(username, password)
        .then((tokens) =>
          __awaiter(this, void 0, void 0, function* () {
            if (tokens) {
              res.status(200).json(tokens.AuthenticationResult);
            } else {
              throw new Error("InvalidToken");
            }
          })
        )
        .catch((err) => {
          console.error("Error object:", err, "           1111111end");
          console.error("test 111111111111111111111" + err.code);
          console.error("test messege111111111111111111111" + err.messege);
          let errorMessage = "Login failed";
          if (err.code === "UserNotConfirmedException") {
            errorMessage = "User is not confirmed, Please confirm your email";
          } else if (err.code === "NotAuthorizedException") {
            errorMessage = "Incorrect username or password, Please try again";
          } else if (err.code === "UserNotFoundException") {
            errorMessage = "User does not exist";
          } else if (err.message === "InvalidToken") {
            errorMessage = "Login failed. Please try again.";
          } else {
            errorMessage = "An unknown error occurred";
          }
          console.error(
            errorMessage,
            "the final decesion made that need send to front end"
          );
          console.log(err.code + "check the err code ");
          res.status(400).json({ message: errorMessage });
        });
    };
    this.verify = (req, res) => {
      const result = (0, express_validator_1.validationResult)(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body);
      const { username, code } = req.body;
      let cognitoService = new cognito_service_1.default();
      cognitoService.confirmSignUp(username, code).then((success) => {
        success ? res.status(200).end() : res.status(400).end();
      });
    };
    this.confirmPassword = (req, res) => {
      const result = (0, express_validator_1.validationResult)(req);
      console.log("Validation Result:", result);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      const { username, newPassword, code } = req.body;
      console.log("Received Username:", username);
      console.log("Received New Password:", newPassword);
      console.log("Received Code:", code);
      let cognitoService = new cognito_service_1.default();
      cognitoService
        .confirmNewPassword(username, newPassword, code)
        .then((response) => {
          if (response.success) {
            console.log("Password reset successful");
            res.status(200).json({ message: "Password reset successful" });
          } else {
            console.log("Password reset failed");
            let statusCode = 500;
            let errorMessage = "Internal server error";
            if (response.code === "CodeMismatchException") {
              errorMessage =
                "Invalid verification code provided, please try again.";
              statusCode = 400;
            } else if (response.code === "LimitExceededException") {
              errorMessage =
                "Attempt limit exceeded, please try after some time.";
              statusCode = 429;
            } else if (response.code === "ExpiredCodeException") {
              errorMessage =
                "The verification code has expired. Please request a new code.";
              statusCode = 400;
            } else if (response.code === "UserNotFoundException") {
              errorMessage = "User does not exist.";
              statusCode = 404;
            } else if (response.message) {
              errorMessage = response.message;
              statusCode = 400;
            }
            res.status(statusCode).json({ message: errorMessage });
          }
        })
        .catch((error) => {
          console.error("Error in confirmPassword:", error);
          res.status(500).json({ message: "Internal server error" });
        });
    };
    this.forgotPassword = (req, res) => {
      console.log("Received request body:", req.body);
      const result = (0, express_validator_1.validationResult)(req);
      console.log("Validation result:", result);
      if (!result.isEmpty()) {
        console.log("Validation failed:", result.array());
        return res.status(422).json({ errors: result.array() });
      }
      const { username } = req.body;
      console.log("Extracted username:", username);
      let cognitoService = new cognito_service_1.default();
      cognitoService
        .forgotPassword(username)
        .then((response) => {
          if (response.success) {
            console.log("Verification code sent successfully");
            res.status(200).json({
              message:
                "Verification code sent to your email. Please check your inbox.",
            });
          } else {
            console.log("Failed to send verification code");
            res.status(400).json({
              message: response.message || "Failed to send verification code",
            });
          }
        })
        .catch((error) => {
          console.error("Error in forgotPassword:", error);
          let errorMessage = "Internal server error";
          let statusCode = 500;
          if (error.code === "LimitExceededException") {
            errorMessage =
              "Attempt limit exceeded, please try after some time.";
            statusCode = 429;
          } else if (error.code === "CodeMismatchException") {
            errorMessage =
              "Invalid verification code provided, please try again.";
            statusCode = 400;
          } else if (error.code === "UserNotFoundException") {
            errorMessage = "User does not exist.";
            statusCode = 404;
          } else if (error.code) {
            errorMessage = error.message;
            statusCode = 400;
          }
          res.status(statusCode).json({ message: errorMessage });
        });
    };
    this.initRoutes();
  }
  initRoutes() {
    this.router.use((0, cors_1.default)());
    this.router.post("/signup", this.validateBody("signUp"), this.signUp);
    this.router.post("/signin", this.validateBody("signIn"), this.signIn);
    this.router.post("/verify", this.validateBody("verify"), this.verify);
    this.router.post(
      "/forgot-password",
      this.validateBody("forgotPassword"),
      this.forgotPassword
    );
    this.router.post(
      "/confirm-password",
      this.validateBody("confirmPassword"),
      this.confirmPassword
    );
    this.router.post("/check-email", this.checkEmail);
  }
  validateBody(type) {
    switch (type) {
      case "signUp":
        return [
          (0, express_validator_1.body)("email")
            .notEmpty()
            .withMessage("Email is required")
            .normalizeEmail()
            .isEmail()
            .withMessage("Invalid email format"),
          (0, express_validator_1.body)("password")
            .isString()
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long"),
        ];
      case "signIn":
        return [
          (0, express_validator_1.body)("username")
            .notEmpty()
            .isLength({ min: 0 }),
          (0, express_validator_1.body)("password")
            .isString()
            .isLength({ min: 0 }),
        ];
      case "verify":
        return [
          (0, express_validator_1.body)("username")
            .notEmpty()
            .isLength({ min: 5 }),
          (0, express_validator_1.body)("code")
            .notEmpty()
            .isString()
            .isLength({ min: 6, max: 6 }),
        ];
      case "forgotPassword":
        return [
          (0, express_validator_1.body)("username")
            .notEmpty()
            .isLength({ min: 5 }),
        ];
      case "confirmPassword":
        return [
          (0, express_validator_1.body)("newPassword")
            .exists()
            .isLength({ min: 8 }),
          (0, express_validator_1.body)("username")
            .notEmpty()
            .isLength({ min: 5 }),
          (0, express_validator_1.body)("code")
            .notEmpty()
            .isString()
            .isLength({ min: 6, max: 6 }),
        ];
      case "verifyCode":
        return [
          (0, express_validator_1.body)("username")
            .notEmpty()
            .isLength({ min: 5 }),
          (0, express_validator_1.body)("code")
            .notEmpty()
            .isString()
            .isLength({ min: 6, max: 6 }),
        ];
    }
  }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map
