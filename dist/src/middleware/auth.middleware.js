"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jwk_to_pem_1 = tslib_1.__importDefault(require("jwk-to-pem"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
let pems = {};
class AuthMiddleware {
    constructor() {
        this.poolRegion = "ca-central-1";
        this.userPoolId = "ca-central-1_ef5bKns1b";
        this.setUp();
    }
    verifyToken(req, resp, next) {
        const { token } = req.body;
        console.log(token);
        if (!token)
            return resp.status(401).end();
        let decodedJwt = jsonwebtoken_1.default.decode(token, { complete: true });
        if (decodedJwt === null) {
            resp.status(401).end();
            return;
        }
        console.log(decodedJwt);
        let kid = decodedJwt.header.kid;
        let pem = pems[kid];
        console.log(pem);
        if (!pem) {
            resp.status(401).end();
            return;
        }
        jsonwebtoken_1.default.verify(token, pem, function (err, payload) {
            if (err) {
                resp.status(401).end();
                return;
            }
            else {
                next();
            }
        });
    }
    async setUp() {
        const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;
        try {
            const response = await (0, node_fetch_1.default)(URL);
            if (response.status !== 200) {
                throw "request not successful";
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
            console.log("got PEMS");
        }
        catch (error) {
            console.log(error);
            console.log("Error! Unable to download JWKs");
        }
    }
}
exports.default = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map