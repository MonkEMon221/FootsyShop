import fs from "fs";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({
          success: false,
          message: "Required Name",
        });
      case !description:
        return res.status(500).send({
          success: false,
          message: "Required Description",
        });
      case !price:
        return res.status(500).send({
          success: false,
          message: "Required Price",
        });
      case !category:
        return res.status(500).send({
          success: false,
          message: "Required Category",
        });
      case !quantity:
        return res.status(500).send({
          success: false,
          message: "Required Quantity",
        });
      case image && image.size > 1000000:
        return res.status(500).send({
          success: false,
          message: "Image required less than 1mb",
        });
    }
    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Product Registered Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Product Not added",
      error,
    });
  }
};

const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "All products",
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Fetching Data",
      error,
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    console.log(req.params.slug);
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Product Received",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Fetching Data",
      error,
    });
  }
};

const getProductImageController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("image");
    if (product?.image?.data) {
      res.set("Content-type", product?.image?.contentType);
      return res.status(200).send(product?.image?.data);
    }
    res.status(200).send({});
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching image",
      error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await productModel.findByIdAndDelete(id).select("-image");
    console.log(product);
    res.status(200).send({
      success: true,
      message: "Data deleted",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting product",
      error,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({
          success: false,
          message: "Required Name",
        });
      case !description:
        return res.status(500).send({
          success: false,
          message: "Required Description",
        });
      case !price:
        return res.status(500).send({
          success: false,
          message: "Required Price",
        });
      case !category:
        return res.status(500).send({
          success: false,
          message: "Required Category",
        });
      case !quantity:
        return res.status(500).send({
          success: false,
          message: "Required Quantity",
        });
      case image && image.size > 1000000:
        return res.status(500).send({
          success: false,
          message: "Image required less than 1mb",
        });
    }
    const products = await productModel.findByIdAndUpdate(req.params.pid, {
      ...req.fields,
      slug: slugify(name),
    });
    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating Product",
      error,
    });
  }
};

const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    //issue to be fixed here, price filter not working correctly
    if (radio.length)
      args.price = { $gte: parseInt(radio[0]), $lte: parseInt(radio[1]) };

    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      message: "Products filtered",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error filtering Products",
    });
  }
};

const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "Got count",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting count",
    });
  }
};

const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-image")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Listing Product page",
    });
  }
};

const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-image");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while searching",
    });
  }
};

const similarProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-image")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Similar Product Fetched",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting Similar Products",
    });
  }
};

const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel
      .find({ category })
      .select("-image")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Product fetched from category",
      products,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting Products by category",
    });
  }
};

export {
  createProductController,
  getProductsController,
  getSingleProductController,
  getProductImageController,
  deleteProductController,
  updateProductController,
  filterProductController,
  productCountController,
  productListController,
  searchProductController,
  similarProductController,
  productCategoryController,
};
