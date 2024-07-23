import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import cors from 'cors';

class ProductController {
  public path = '/api/products';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.use(cors()); // 添加CORS中间件
    this.router.get('/', this.getAllProducts);
    this.router.post('/', this.createProduct);
  }

  private getAllProducts = async (req: Request, res: Response) => {
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

      console.log('Fetched products:', products);

      // Send response with products and pagination information
      res.json({
        products,
        totalProducts,
        page,
        pageSize
      });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  };

  private createProduct = async (req: Request, res: Response) => {
    try {
      console.log('Creating product with data:', req.body);
      const product = await Product.create(req.body);
      console.log('Created product:', product);
      res.json(product);
    } catch (error) {
      console.error('Failed to create product:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  };
}

export default ProductController;