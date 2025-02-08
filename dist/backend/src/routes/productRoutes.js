"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const product_model_1 = require("../models/product.model");
const sequelize_1 = require("sequelize");
const cors_1 = tslib_1.__importDefault(require("cors"));
class ProductController {
    constructor() {
        this.path = "/api/products";
        this.router = (0, express_1.Router)();
        this.getAllProducts = async (req, res) => {
            // Get pagination and filter parameters from the query string
            const page = parseInt(req.query.page, 10) || 1; // Default to page 1
            const pageSize = parseInt(req.query.pageSize, 10) || 10; // Default to 10 items per page
            const { brand, type, minPrice, maxPrice, sort, search } = req.query;
            try {
                // Build the query options
                const options = {
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
                    where: {},
                };
                if (brand)
                    options.where.brand = brand;
                if (type)
                    options.where.type = type;
                if (minPrice || maxPrice) {
                    options.where.price = {};
                    if (minPrice)
                        options.where.price[sequelize_1.Op.gte] = parseFloat(minPrice);
                    if (maxPrice)
                        options.where.price[sequelize_1.Op.lte] = parseFloat(maxPrice);
                }
                if (sort) {
                    switch (sort) {
                        case "price-asc":
                            options.order = [["price", "ASC"]];
                            break;
                        case "price-desc":
                            options.order = [["price", "DESC"]];
                            break;
                        case "newest":
                            options.order = [["createdAt", "DESC"]];
                            break;
                        default:
                            options.order = [["createdAt", "DESC"]];
                    }
                }
                if (search)
                    options.where.name = { [sequelize_1.Op.iLike]: `%${search}%` };
                // Fetch products with pagination and filters
                const products = await product_model_1.Product.findAll(options);
                // Fetch the total number of products that match the filters
                const totalProducts = await product_model_1.Product.count({ where: options.where });
                // Send response with products and pagination information
                res.json({
                    products,
                    totalProducts,
                    page,
                    pageSize,
                });
            }
            catch (error) {
                console.error("Error fetching products:", error);
                res.status(500).json({ error: "Failed to fetch products" });
            }
        };
        this.createProduct = async (req, res) => {
            try {
                console.log("Creating product with data:", req.body);
                const product = await product_model_1.Product.create(req.body);
                console.log("Created product:", product);
                res.json(product);
            }
            catch (error) {
                console.error("Failed to create product:", error);
                res.status(500).json({ error: "Failed to create product" });
            }
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.use((0, cors_1.default)()); // 添加CORS中间件
        this.router.get("/", this.getAllProducts);
        this.router.post("/", this.createProduct);
    }
}
exports.default = ProductController;
//# sourceMappingURL=productRoutes.js.map