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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
class UserService {
  createUserIfNotExists(sub, email) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let user = yield user_model_1.User.findOne({ where: { sub } });
        if (!user) {
          yield user_model_1.User.create({ sub, email });
        }
      } catch (err) {
        console.error("Error in createUserIfNotExists:", err);
        throw err;
      }
    });
  }
  checkEmailExists(email) {
    return __awaiter(this, void 0, void 0, function* () {
      const user = yield user_model_1.User.findOne({ where: { email } });
      return !!user;
    });
  }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
