"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = require("supertest");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const app_1 = tslib_1.__importDefault(require("app"));
describe("Helathcheck API", () => {
    describe("GET /api/health", () => {
        test("should return 200 status if all OK", async () => {
            await (0, supertest_1.agent)(app_1.default).get("/api/health").send().expect(http_status_1.default.OK);
        });
    });
});
//# sourceMappingURL=healthCheck.test.js.map