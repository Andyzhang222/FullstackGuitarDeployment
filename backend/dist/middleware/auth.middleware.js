"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwk_to_pem_1 = __importDefault(require("jwk-to-pem"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const node_fetch_1 = __importDefault(require("node-fetch"));
let pems = {};
class AuthMiddleware {
    constructor() {
        this.poolRegion = 'ca-central-1';
        this.userPoolId = 'ca-central-1_ef5bKns1b';
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
    setUp() {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;
            try {
                const response = yield node_fetch_1.default(URL);
                if (response.status !== 200) {
                    throw 'request not successful';
                }
                const data = yield response.json();
                const { keys } = data;
                for (let i = 0; i < keys.length; i++) {
                    const key_id = keys[i].kid;
                    const modulus = keys[i].n;
                    const exponent = keys[i].e;
                    const key_type = keys[i].kty;
                    const jwk = { kty: key_type, n: modulus, e: exponent };
                    const pem = jwk_to_pem_1.default(jwk);
                    pems[key_id] = pem;
                }
                console.log("got PEMS");
            }
            catch (error) {
                console.log(error);
                console.log('Error! Unable to download JWKs');
            }
        });
    }
}
exports.default = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map