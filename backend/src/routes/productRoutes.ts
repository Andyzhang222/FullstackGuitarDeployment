import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { Op } from 'sequelize';
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
    // Get pagination and filter parameters from the query string
    const page = parseInt(req.query.page as string, 10) || 1; // Default to page 1
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10; // Default to 10 items per page
    const { brand, type, minPrice, maxPrice, sort, search } = req.query;

    try {
      // Build the query options
      const options: any = {
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: {},
      };

      if (brand) options.where.brand = brand;
      if (type) options.where.type = type;
      if (minPrice || maxPrice) {
        options.where.price = {};
        if (minPrice) options.where.price[Op.gte] = parseFloat(minPrice as string);
        if (maxPrice) options.where.price[Op.lte] = parseFloat(maxPrice as string);
      }
      if (sort) {
        switch (sort) {
          case 'price-asc':
            options.order = [['price', 'ASC']];
            break;
          case 'price-desc':
            options.order = [['price', 'DESC']];
            break;
          case 'newest':
            options.order = [['createdAt', 'DESC']];
            break;
          default:
            options.order = [['createdAt', 'DESC']];
        }
      }
      if (search) options.where.name = { [Op.iLike]: `%${search}%` };

      // Fetch products with pagination and filters
      const products = await Product.findAll(options);

      // Fetch the total number of products that match the filters
      const totalProducts = await Product.count({ where: options.where });

      // Send response with products and pagination information
      res.json({
        products,
        totalProducts,
        page,
        pageSize,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
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