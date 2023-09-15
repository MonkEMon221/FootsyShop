import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  filterProductController,
  getProductImageController,
  getProductsController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productListController,
  searchProductController,
  similarProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

router.get("/products", getProductsController);
router.get("/single-product/:slug", getSingleProductController);

router.get("/product-image/:pid", getProductImageController);

router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

router.post("/filter-product", filterProductController);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

router.get("/similar-product/:pid/:cid", similarProductController);

router.get("/product-category/:slug", productCategoryController);

export default router;
