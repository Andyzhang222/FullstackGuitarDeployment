import { Router, Request, Response } from 'express';
import { Product } from '../models';

const router = Router();

router.get('/products', async (req: Request, res: Response) => {
  // Get pagination parameters from the query string
  const page = parseInt(req.query.page as string, 10) || 1; // Default to page 1
  const pageSize = parseInt(req.query.pageSize as string, 10) || 10; // Default to 10 items per page

  try {
    // Fetch products with pagination
    const products = await Product.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize
    });

    // Fetch the total number of products
    const totalProducts = await Product.count();

    // Send response with products and pagination information
    res.json({
      products,
      totalProducts,
      page,
      pageSize
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;