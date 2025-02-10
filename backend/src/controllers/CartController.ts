import { Router, Request, Response } from "express";
import { CartItem } from "../models/CartItem.model";
import { Product } from "../models/product.model";
import AuthMiddleware from "../middleware/auth.middleware"; // 引入 AuthMiddleware
import cors from "cors";

class CartController {
  public path = "/carts";
  public router = Router();
  private authMiddleware = new AuthMiddleware(); // 实例化 AuthMiddleware

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.use(cors()); // 添加 CORS 中间件
    this.router.use(this.authMiddleware.verifyToken); // 应用 AuthMiddleware 到所有路由
    this.router.get("/", this.getAllCartItems); // 获取当前用户的所有购物车项
    this.router.post("/", this.addCartItem); // 添加新购物车项
    this.router.post("/remove", this.removeCartItem); // 移除购物车项
    this.router.post("/check-stock", this.checkStock);
    this.router.post("/update", this.updateCartItem);
    this.router.post("/remove-entire", this.removeEntireCartItem);
    this.router.get("/check-all-stock", this.checkAllCartItemsStock);
  }

  // 检查购物车中所有商品的库存
private checkAllCartItemsStock = async (req: Request, res: Response) => {
  const userId = req.userId; // 获取 userId

  try {
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "quantity"], // 获取库存
        },
      ],
    });

    if (cartItems.length === 0) {
      return res.status(404).json({ error: "No cart items found" });
    }

    // 检查每个购物车项的库存是否足够
    const stockResults = cartItems.map((item) => ({
      productId: item.productId,
      currentQuantity: item.quantity,
      availableQuantity: item.product?.quantity || 0,
    }));

    res.json({ stockResults });
  } catch (error) {
    console.error("Error checking cart items stock:", error);
    res.status(500).json({ error: "Failed to check cart items stock" });
  }
};

private updateCartItem = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const userId = req.userId; // 从中间件获取 userId

  try {
    const cartItem = await CartItem.findOne({ where: { userId, productId } });
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    const product = await Product.findByPk(productId);
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
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({ error: "Failed to update cart item" });
  }
};

  // 获取当前用户的所有购物车项
  private getAllCartItems = async (req: Request, res: Response) => {
    const userId = req.userId; // 从中间件获取 userId

    try {
      const cartItems = await CartItem.findAll({
        where: { userId },
        include: [
          {
            model: Product,
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

      const formattedCartItems = cartItems.map((item) => ({
        productId: item.productId,
        name: item.product?.name,
        image: item.product?.image,
        quantity: item.quantity,
        price: item.price,
      }));

      res.json({
        cartItems: formattedCartItems,
        totalItems: cartItems.length,
      });
    } catch (error) {
      console.error("Error fetching cart items:", error);
      res.status(500).json({ error: "Failed to fetch cart items" });
    }
  };

  // 添加新购物车项
  private addCartItem = async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;
    const userId = req.userId; // 从中间件获取 userId

    console.log("Received Authorization Header:", req.headers["authorization"]);
    
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      // 检查库存是否足够
      const existingCartItem = await CartItem.findOne({
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
      } else {
        await CartItem.create({
          userId,
          productId,
          quantity,
          price: product.price,
        });
      }
      
      // 获取更新后的购物车项并返回
      const updatedCartItems = await CartItem.findAll({
        where: { userId },
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "image"],
          },
        ],
      });
      return res.json({
        cartItems: updatedCartItems,
        totalItems: updatedCartItems.length,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      return res.status(500).json({ error: "Failed to add item to cart" });
    }
  };

  // 移除购物车项
  // 移除购物车项
  private removeCartItem = async (req: Request, res: Response) => {
    const { productId } = req.body;
    const userId = req.userId; // 从 req 中获取 userId
  
    if (!userId) {
      return res.status(400).json({ success: false, error: "User ID is missing" });
    }
  
    try {
      const cartItem = await CartItem.findOne({ where: { userId, productId } });
  
      if (!cartItem) {
        console.log(
          `Item not found in cart for productId: ${productId}, userId: ${userId}`
        );
        return res
          .status(404)
          .json({ success: false, error: "Item not found in cart" });
      }
  
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        await cartItem.save();
        console.log(
          `Reduced quantity for productId: ${productId} to ${cartItem.quantity}`
        );
      } else {
        await cartItem.destroy();
        console.log(`Removed item from cart for productId: ${productId}`);
      }
  
      return res.json({ success: true });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to remove item from cart" });
    }
  };

  // 完全删除购物车项
private removeEntireCartItem = async (req: Request, res: Response) => {
  const { productId } = req.body;
  const userId = req.userId; // 获取 userId

  if (!userId) {
    return res.status(400).json({ success: false, error: "User ID is missing" });
  }

  try {
    const cartItem = await CartItem.findOne({ where: { userId, productId } });

    if (!cartItem) {
      return res.status(404).json({ success: false, error: "Item not found in cart" });
    }

    // 直接删除购物车项，而不是减少数量
    await cartItem.destroy();

    console.log(`Removed item with productId: ${productId} from cart`);
    return res.json({ success: true });
  } catch (error) {
    console.error("Failed to remove entire item from cart:", error);
    return res.status(500).json({ success: false, error: "Failed to remove entire item from cart" });
  }
};

  private checkStock = async (req: Request, res: Response) => {
    const { items } = req.body; // 前端传来的购物车商品数组
  
    try {
      // 遍历所有购物车商品，检查每个商品的库存
      const stockResults = await Promise.all(
        items.map(async (item: any) => {
          const product = await Product.findByPk(item.productId);
  
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
        })
      );
  
      const outOfStockItems = stockResults.filter((item) => !item.isInStock);
  
      if (outOfStockItems.length > 0) {
        return res.status(400).json({
          error: 'Insufficient stock',
          availableQuantity: outOfStockItems[0].availableQuantity,
        });
      }
  
      // 返回库存检查结果
      res.status(200).json({ stockResults });
    } catch (error) {
      console.error('Error checking stock:', error);
      res.status(500).json({ message: 'Error checking stock', error });
    }
  };
}

export default CartController;
