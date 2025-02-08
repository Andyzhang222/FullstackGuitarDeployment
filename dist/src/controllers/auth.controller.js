"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = tslib_1.__importStar(require("express"));
const express_validator_1 = require("express-validator");
const cognito_service_1 = tslib_1.__importDefault(require("../services/cognito.service"));
class AuthController {
    constructor() {
        this.path = "/auth";
        this.router = express.Router();
        // Signup new user
        this.signUp = (req, res) => {
            const result = (0, express_validator_1.validationResult)(req);
            if (!result.isEmpty()) {
                return res.status(422).json({ errors: result.array() });
            }
            console.log(req.body);
            const { username, password, email, gender, birthdate, name, family_name } = req.body;
            let userAttr = [];
            userAttr.push({ Name: "email", Value: email });
            userAttr.push({ Name: "gender", Value: gender });
            userAttr.push({ Name: "birthdate", Value: birthdate.toString() });
            userAttr.push({ Name: "name", Value: name });
            userAttr.push({ Name: "family_name", Value: family_name });
            let cognitoService = new cognito_service_1.default();
            cognitoService.signUpUser(username, password, userAttr).then((success) => {
                success ? res.status(200).end() : res.status(400).end();
            });
        };
        // Use username and password to authenticate user
        this.signIn = (req, res) => {
            const result = (0, express_validator_1.validationResult)(req);
            if (!result.isEmpty()) {
                return res.status(422).json({ errors: result.array() });
            }
            console.log(req.body);
            const { username, password } = req.body;
            let cognitoService = new cognito_service_1.default();
            cognitoService.signInUser(username, password).then((success) => {
                success ? res.status(200).end() : res.status(400).end();
            });
        };
        // confirm signup account with code sent to email
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
            if (!result.isEmpty()) {
                return res.status(422).json({ errors: result.array() });
            }
            const { username, password, code } = req.body;
            let cognitoService = new cognito_service_1.default();
            cognitoService
                .confirmNewPassword(username, password, code)
                .then((success) => {
                success ? res.status(200).end() : res.status(400).end();
            });
        };
        this.forgotPassword = (req, res) => {
            const result = (0, express_validator_1.validationResult)(req);
            if (!result.isEmpty()) {
                return res.status(422).json({ errors: result.array() });
            }
            const { username } = req.body;
            let cognitoService = new cognito_service_1.default();
            cognitoService.forgotPassword(username).then((success) => {
                success ? res.status(200).end() : res.status(400).end();
            });
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/signup", this.validateBody("signUp"), this.signUp);
        this.router.post("/signin", this.validateBody("signIn"), this.signIn);
        this.router.post("/verify", this.validateBody("verify"), this.verify);
        this.router.post("/forgot-password", this.validateBody("forgotPassword"), this.forgotPassword);
        this.router.post("/confirm-password", this.validateBody("confirmPassword"), this.confirmPassword);
    }
    validateBody(type) {
        switch (type) {
            case "signUp":
                return [
                    (0, express_validator_1.body)("username").notEmpty().isLength({ min: 5 }),
                    (0, express_validator_1.body)("email").notEmpty().normalizeEmail().isEmail(),
                    (0, express_validator_1.body)("password").isString().isLength({ min: 8 }),
                    (0, express_validator_1.body)("birthdate").exists().isISO8601(),
                    (0, express_validator_1.body)("gender").notEmpty().isString(),
                    (0, express_validator_1.body)("name").notEmpty().isString(),
                    (0, express_validator_1.body)("family_name").notEmpty().isString(),
                ];
            case "signIn":
                return [
                    (0, express_validator_1.body)("username").notEmpty().isLength({ min: 5 }),
                    (0, express_validator_1.body)("password").isString().isLength({ min: 8 }),
                ];
            case "verify":
                return [
                    (0, express_validator_1.body)("username").notEmpty().isLength({ min: 5 }),
                    (0, express_validator_1.body)("code").notEmpty().isString().isLength({ min: 6, max: 6 }),
                ];
            case "forgotPassword":
                return [(0, express_validator_1.body)("username").notEmpty().isLength({ min: 5 })];
            case "confirmPassword":
                return [
                    (0, express_validator_1.body)("password").exists().isLength({ min: 8 }),
                    (0, express_validator_1.body)("username").notEmpty().isLength({ min: 5 }),
                    (0, express_validator_1.body)("code").notEmpty().isString().isLength({ min: 6, max: 6 }),
                ];
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map