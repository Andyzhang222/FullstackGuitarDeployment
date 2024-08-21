"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_model_1 = require("../models/product.model");
const sequelize_1 = require("sequelize");
const cors_1 = __importDefault(require("cors"));
class ProductController {
  constructor() {
    this.path = "/api/products";
    this.router = (0, express_1.Router)();
    this.getAllProducts = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const { brand, type, minPrice, maxPrice, sort, search } = req.query;
        try {
          const options = {
            limit: pageSize,
            offset: (page - 1) * pageSize,
            where: {},
          };
          if (brand) options.where.brand = brand;
          if (type) options.where.type = type;
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
          const products = yield product_model_1.Product.findAll(options);
          const totalProducts = yield product_model_1.Product.count({
            where: options.where,
          });
          res.json({
            products,
            totalProducts,
            page,
            pageSize,
          });
        } catch (error) {
          console.error("Error fetching products:", error);
          res.status(500).json({ error: "Failed to fetch products" });
        }
      });
    this.createProduct = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        try {
          console.log("Creating product with data:", req.body);
          const product = yield product_model_1.Product.create(req.body);
          console.log("Created product:", product);
          res.json(product);
        } catch (error) {
          console.error("Failed to create product:", error);
          res.status(500).json({ error: "Failed to create product" });
        }
      });
    this.initRoutes();
  }
  initRoutes() {
    this.router.use((0, cors_1.default)());
    this.router.get("/", this.getAllProducts);
    this.router.post("/", this.createProduct);
  }
}
exports.default = ProductController;
//# sourceMappingURL=productRoutes.js.map
