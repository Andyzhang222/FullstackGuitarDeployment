import { Cart } from "../models/Cart.model";
import { CartItem } from "../models/CartItem.model";
import { Product } from "../models/product.model";

class CartService {

  
  public async addItemToCart(
    userId: string,
    productId: string,
    quantity: number
  ) {
    // 找到或创建购物车
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    // 检查购物车中是否已经有该商品
    let cartItem = await CartItem.findOne({
      where: { cartId: cart.cartId, productId },
    });

    if (cartItem) {
      // 更新数量
      cartItem.quantity += quantity;
    } else {
      // 添加新商品
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      cartItem = await CartItem.create({
        cartId: cart.cartId,
        productId,
        quantity,
        price: product.price,
      });
    }

    await cartItem.save();
    return cartItem;
  }

  public async getCartItems(userId: string) {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return [];
    }

    const cartItems = await CartItem.findAll({
      where: { cartId: cart.cartId },
    });
    return cartItems;
  }

  public async removeCartItem(userId: string, productId: string) {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      throw new Error("Cart not found");
    }

    const cartItem = await CartItem.findOne({
      where: { cartId: cart.cartId, productId },
    });
    if (!cartItem) {
      throw new Error("Item not found in cart");
    }

    await cartItem.destroy();
    return cartItem;
  }
}

export default CartService;
