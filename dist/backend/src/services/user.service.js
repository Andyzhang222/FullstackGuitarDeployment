"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
class UserService {
    async createUserIfNotExists(sub, email) {
        try {
            let user = await user_model_1.User.findOne({ where: { sub } });
            if (!user) {
                await user_model_1.User.create({ sub, email });
            }
        }
        catch (err) {
            console.error("Error in createUserIfNotExists:", err);
            throw err;
        }
    }
    async checkEmailExists(email) {
        const user = await user_model_1.User.findOne({ where: { email } });
        return !!user;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map