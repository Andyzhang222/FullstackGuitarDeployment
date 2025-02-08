"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jwk_to_pem_1 = tslib_1.__importDefault(require("jwk-to-pem"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
let pems = {};
class AuthMiddleware {
    constructor() {
        this.poolRegion = process.env.POOL_REGION;
        this.userPoolId = process.env.USER_POOL_ID;
        this.setUp();
    }
    verifyToken(req, res, next) {
        var _a;
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log("Authorization token:", token); // 调试信息
        if (!token) {
            console.log("Token is missing"); // 调试信息
            res.status(401).send("Token is missing");
            return;
        }
        const decodedJwt = jsonwebtoken_1.default.decode(token, { complete: true });
        console.log("Decoded JWT:", decodedJwt); // 调试信息
        if (!decodedJwt) {
            console.log("Token is invalid (decoding failed)"); // 调试信息
            res.status(401).send("Token is invalid");
            return;
        }
        const kid = decodedJwt.header.kid;
        const pem = pems[kid];
        console.log("PEM used for verification:", pem); // 调试信息
        if (!pem) {
            console.log("Token is invalid (no matching PEM)"); // 调试信息
            res.status(401).send("Token is invalid");
            return;
        }
        jsonwebtoken_1.default.verify(token, pem, (err, payload) => {
            if (err) {
                console.log("Token is invalid (verification failed)", err); // 调试信息
                res.status(401).send("Token is invalid");
                return;
            }
            const userId = payload.sub;
            console.log("Extracted userId:", userId); // 调试信息
            req.userId = userId; // 将 userId 附加到 req 对象上
            next();
        });
    }
    async setUp() {
        const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;
        try {
            const response = await (0, node_fetch_1.default)(URL);
            if (response.status !== 200) {
                throw new Error("Request not successful");
            }
            const data = await response.json();
            const { keys } = data;
            for (let i = 0; i < keys.length; i++) {
                const key_id = keys[i].kid;
                const modulus = keys[i].n;
                const exponent = keys[i].e;
                const key_type = keys[i].kty;
                const jwk = { kty: key_type, n: modulus, e: exponent };
                const pem = (0, jwk_to_pem_1.default)(jwk);
                pems[key_id] = pem;
            }
            console.log("PEMS loaded successfully");
        }
        catch (error) {
            console.error("Error! Unable to download JWKs", error);
        }
    }
}
exports.default = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map