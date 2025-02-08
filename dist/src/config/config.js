"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const dotenv = tslib_1.__importStar(require("dotenv"));
dotenv.config({ path: `.env.local` });
// All env variables used by the app should be defined in this file.
// To define new env:
// 1. Add env variable to .env.local file;
// 2. Provide validation rules for your env in envsSchema;
// 3. Make it visible outside of this module in export section;
// 4. Access your env variable only via config file.
// Do not use process.env object outside of this file.
const envsSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string().valid("production", "integration", "development"),
    PORT: joi_1.default.number().default(3000),
    API_KEY_TOKEN: joi_1.default.string(),
})
    .unknown(true);
const { value: envVars, error } = envsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}. \n
     This app requires env variables to work properly. If you run app locally use docker-compose`);
}
// map env vars and make it visible outside module
exports.default = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    xApiKey: envVars.API_KEY_TOKEN,
};
//# sourceMappingURL=config.js.map