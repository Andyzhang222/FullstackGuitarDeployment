"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const product_model_1 = require("../models/product.model");
const auth_middleware_1 = tslib_1.__importDefault(require("../middleware/auth.middleware"));
const router = express_1.default.Router();
const auth = new auth_middleware_1.default();
// 检查库存的 API 路由
router.post('/check-stock', auth.verifyToken, async (req, res) => {
    try {
        const { items } = req.body; // 前端传来的产品列表 [{ productId, quantity }]
        const productIds = items.map((item) => item.productId);
        const products = await product_model_1.Product.findAll({ where: { id: productIds } });
        const stockResults = products.map(product => {
            const requestedItem = items.find(item => item.productId === product.id);
            if (requestedItem) {
                return {
                    productId: product.id,
                    name: product.name,
                    requestedQuantity: requestedItem.quantity,
                    availableQuantity: product.quantity,
                    isInStock: product.quantity >= requestedItem.quantity
                };
            }
            return null;
        }).filter(Boolean);
        const outOfStockItems = stockResults.filter(result => !(result === null || result === void 0 ? void 0 : result.isInStock));
        if (outOfStockItems.length > 0) {
            return res.status(400).json({
                success: false,
                message: '部分产品库存不足',
                outOfStockItems,
            });
        }
        return res.json({
            success: true,
            message: '库存充足',
            stockResults,
        });
    }
    catch (error) {
        console.error('Error checking stock:', error);
        return res.status(500).json({ success: false, message: '服务器错误' });
    }
});
exports.default = router;
//# sourceMappingURL=checkStock.js.map