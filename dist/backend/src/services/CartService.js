"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cart_model_1 = require("../models/Cart.model");
const CartItem_model_1 = require("../models/CartItem.model");
const product_model_1 = require("../models/product.model");
class CartService {
    async addItemToCart(userId, productId, quantity) {
        // 找到或创建购物车
        let cart = await Cart_model_1.Cart.findOne({ where: { userId } });
        if (!cart) {
            cart = await Cart_model_1.Cart.create({ userId });
        }
        // 检查购物车中是否已经有该商品
        let cartItem = await CartItem_model_1.CartItem.findOne({
            where: { cartId: cart.cartId, productId },
        });
        if (cartItem) {
            // 更新数量
            cartItem.quantity += quantity;
        }
        else {
            // 添加新商品
            const product = await product_model_1.Product.findByPk(productId);
            if (!product) {
                throw new Error("Product not found");
            }
            cartItem = await CartItem_model_1.CartItem.create({
                cartId: cart.cartId,
                productId,
                quantity,
                price: product.price,
            });
        }
        await cartItem.save();
        return cartItem;
    }
    async getCartItems(userId) {
        const cart = await Cart_model_1.Cart.findOne({ where: { userId } });
        if (!cart) {
            return [];
        }
        const cartItems = await CartItem_model_1.CartItem.findAll({
            where: { cartId: cart.cartId },
        });
        return cartItems;
    }
    async removeCartItem(userId, productId) {
        const cart = await Cart_model_1.Cart.findOne({ where: { userId } });
        if (!cart) {
            throw new Error("Cart not found");
        }
        const cartItem = await CartItem_model_1.CartItem.findOne({
            where: { cartId: cart.cartId, productId },
        });
        if (!cartItem) {
            throw new Error("Item not found in cart");
        }
        await cartItem.destroy();
        return cartItem;
    }
}
exports.default = CartService;
//# sourceMappingURL=CartService.js.map