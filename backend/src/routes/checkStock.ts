import express from "express";
import { Product } from "../models/product.model";
import AuthMiddleware from "../middleware/auth.middleware";

const router = express.Router();
const auth = new AuthMiddleware();

// 检查库存的 API 路由
router.post('/check-stock', auth.verifyToken, async (req, res) => {
  try {
    const { items } = req.body;  // 前端传来的产品列表 [{ productId, quantity }]
    
    const productIds = items.map((item: { productId: number }) => item.productId);
    const products = await Product.findAll({ where: { id: productIds } });

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

    const outOfStockItems = stockResults.filter(result => !result?.isInStock);
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
  } catch (error) {
    console.error('Error checking stock:', error);
    return res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;