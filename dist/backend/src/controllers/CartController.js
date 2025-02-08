"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const CartItem_model_1 = require("../models/CartItem.model");
const product_model_1 = require("../models/product.model");
const auth_middleware_1 = tslib_1.__importDefault(require("../middleware/auth.middleware")); // 引入 AuthMiddleware
const cors_1 = tslib_1.__importDefault(require("cors"));
class CartController {
    constructor() {
        this.path = "/carts";
        this.router = (0, express_1.Router)();
        this.authMiddleware = new auth_middleware_1.default(); // 实例化 AuthMiddleware
        // 检查购物车中所有商品的库存
        this.checkAllCartItemsStock = async (req, res) => {
            const userId = req.userId; // 获取 userId
            try {
                const cartItems = await CartItem_model_1.CartItem.findAll({
                    where: { userId },
                    include: [
                        {
                            model: product_model_1.Product,
                            as: "product",
                            attributes: ["id", "name", "quantity"], // 获取库存
                        },
                    ],
                });
                if (cartItems.length === 0) {
                    return res.status(404).json({ error: "No cart items found" });
                }
                // 检查每个购物车项的库存是否足够
                const stockResults = cartItems.map((item) => {
                    var _a;
                    return ({
                        productId: item.productId,
                        currentQuantity: item.quantity,
                        availableQuantity: ((_a = item.product) === null || _a === void 0 ? void 0 : _a.quantity) || 0,
                    });
                });
                res.json({ stockResults });
            }
            catch (error) {
                console.error("Error checking cart items stock:", error);
                res.status(500).json({ error: "Failed to check cart items stock" });
            }
        };
        this.updateCartItem = async (req, res) => {
            const { productId, quantity } = req.body;
            const userId = req.userId; // 从中间件获取 userId
            try {
                const cartItem = await CartItem_model_1.CartItem.findOne({ where: { userId, productId } });
                if (!cartItem) {
                    return res.status(404).json({ error: "Cart item not found" });
                }
                const product = await product_model_1.Product.findByPk(productId);
                if (!product) {
                    return res.status(404).json({ error: "Product not found" });
                }
                // 检查库存
                if (quantity > product.quantity) {
                    return res.status(400).json({
                        error: "Insufficient stock",
                        availableQuantity: product.quantity,
                    });
                }
                // 更新商品数量
                cartItem.quantity = quantity;
                await cartItem.save();
                return res.json({ success: true, cartItem });
            }
            catch (error) {
                console.error("Error updating cart item:", error);
                return res.status(500).json({ error: "Failed to update cart item" });
            }
        };
        // 获取当前用户的所有购物车项
        this.getAllCartItems = async (req, res) => {
            const userId = req.userId; // 从中间件获取 userId
            try {
                const cartItems = await CartItem_model_1.CartItem.findAll({
                    where: { userId },
                    include: [
                        {
                            model: product_model_1.Product,
                            as: "product",
                            attributes: ["id", "name", "image"],
                        },
                    ],
                });
                if (cartItems.length === 0) {
                    return res
                        .status(404)
                        .json({ error: "No cart items found for this user" });
                }
                const formattedCartItems = cartItems.map((item) => {
                    var _a, _b;
                    return ({
                        productId: item.productId,
                        name: (_a = item.product) === null || _a === void 0 ? void 0 : _a.name,
                        image: (_b = item.product) === null || _b === void 0 ? void 0 : _b.image,
                        quantity: item.quantity,
                        price: item.price,
                    });
                });
                res.json({
                    cartItems: formattedCartItems,
                    totalItems: cartItems.length,
                });
            }
            catch (error) {
                console.error("Error fetching cart items:", error);
                res.status(500).json({ error: "Failed to fetch cart items" });
            }
        };
        // 添加新购物车项
        this.addCartItem = async (req, res) => {
            const { productId, quantity } = req.body;
            const userId = req.userId; // 从中间件获取 userId
            try {
                const product = await product_model_1.Product.findByPk(productId);
                if (!product) {
                    return res.status(404).json({ error: "Product not found" });
                }
                // 检查库存是否足够
                const existingCartItem = await CartItem_model_1.CartItem.findOne({
                    where: { userId, productId },
                });
                const totalQuantity = existingCartItem
                    ? existingCartItem.quantity + quantity
                    : quantity;
                if (totalQuantity > product.quantity) {
                    console.log(`Insufficient stock for productId: ${productId}. Requested: ${totalQuantity}, Available: ${product.quantity}`);
                    return res.status(400).json({
                        error: "Insufficient stock",
                        availableQuantity: product.quantity,
                    });
                }
                // 如果库存足够，继续处理添加到购物车的逻辑
                if (existingCartItem) {
                    existingCartItem.quantity += quantity;
                    await existingCartItem.save();
                }
                else {
                    await CartItem_model_1.CartItem.create({
                        userId,
                        productId,
                        quantity,
                        price: product.price,
                    });
                }
                // 获取更新后的购物车项并返回
                const updatedCartItems = await CartItem_model_1.CartItem.findAll({
                    where: { userId },
                    include: [
                        {
                            model: product_model_1.Product,
                            as: "product",
                            attributes: ["id", "name", "image"],
                        },
                    ],
                });
                return res.json({
                    cartItems: updatedCartItems,
                    totalItems: updatedCartItems.length,
                });
            }
            catch (error) {
                console.error("Error adding item to cart:", error);
                return res.status(500).json({ error: "Failed to add item to cart" });
            }
        };
        // 移除购物车项
        // 移除购物车项
        this.removeCartItem = async (req, res) => {
            const { productId } = req.body;
            const userId = req.userId; // 从 req 中获取 userId
            if (!userId) {
                return res.status(400).json({ success: false, error: "User ID is missing" });
            }
            try {
                const cartItem = await CartItem_model_1.CartItem.findOne({ where: { userId, productId } });
                if (!cartItem) {
                    console.log(`Item not found in cart for productId: ${productId}, userId: ${userId}`);
                    return res
                        .status(404)
                        .json({ success: false, error: "Item not found in cart" });
                }
                if (cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                    await cartItem.save();
                    console.log(`Reduced quantity for productId: ${productId} to ${cartItem.quantity}`);
                }
                else {
                    await cartItem.destroy();
                    console.log(`Removed item from cart for productId: ${productId}`);
                }
                return res.json({ success: true });
            }
            catch (error) {
                console.error("Failed to remove item from cart:", error);
                return res
                    .status(500)
                    .json({ success: false, error: "Failed to remove item from cart" });
            }
        };
        // 完全删除购物车项
        this.removeEntireCartItem = async (req, res) => {
            const { productId } = req.body;
            const userId = req.userId; // 获取 userId
            if (!userId) {
                return res.status(400).json({ success: false, error: "User ID is missing" });
            }
            try {
                const cartItem = await CartItem_model_1.CartItem.findOne({ where: { userId, productId } });
                if (!cartItem) {
                    return res.status(404).json({ success: false, error: "Item not found in cart" });
                }
                // 直接删除购物车项，而不是减少数量
                await cartItem.destroy();
                console.log(`Removed item with productId: ${productId} from cart`);
                return res.json({ success: true });
            }
            catch (error) {
                console.error("Failed to remove entire item from cart:", error);
                return res.status(500).json({ success: false, error: "Failed to remove entire item from cart" });
            }
        };
        this.checkStock = async (req, res) => {
            const { items } = req.body; // 前端传来的购物车商品数组
            try {
                // 遍历所有购物车商品，检查每个商品的库存
                const stockResults = await Promise.all(items.map(async (item) => {
                    const product = await product_model_1.Product.findByPk(item.productId);
                    if (!product || product.quantity < item.quantity) {
                        return {
                            productId: item.productId,
                            isInStock: false,
                            availableQuantity: product ? product.quantity : 0,
                        };
                    }
                    return {
                        productId: item.productId,
                        isInStock: true,
                        availableQuantity: product.quantity,
                    };
                }));
                const outOfStockItems = stockResults.filter((item) => !item.isInStock);
                if (outOfStockItems.length > 0) {
                    return res.status(400).json({
                        error: 'Insufficient stock',
                        availableQuantity: outOfStockItems[0].availableQuantity,
                    });
                }
                // 返回库存检查结果
                res.status(200).json({ stockResults });
            }
            catch (error) {
                console.error('Error checking stock:', error);
                res.status(500).json({ message: 'Error checking stock', error });
            }
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.use((0, cors_1.default)()); // 添加 CORS 中间件
        this.router.use(this.authMiddleware.verifyToken); // 应用 AuthMiddleware 到所有路由
        this.router.get("/", this.getAllCartItems); // 获取当前用户的所有购物车项
        this.router.post("/", this.addCartItem); // 添加新购物车项
        this.router.post("/remove", this.removeCartItem); // 移除购物车项
        this.router.post("/check-stock", this.checkStock);
        this.router.post("/update", this.updateCartItem);
        this.router.post("/remove-entire", this.removeEntireCartItem);
        this.router.get("/check-all-stock", this.checkAllCartItemsStock);
    }
}
exports.default = CartController;
//# sourceMappingURL=CartController.js.map