import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Name is Required",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exists",
      });
    }
    const category = await categoryModel({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: "New Category Created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Category",
    });
  }
};
//update category
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Category is required",
      });
    }
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
    });
  }
};

//get-All categories

const getAllCategoriesController = async (req, res) => {
  const categories = await categoryModel.find({});
  res.status(200).send({
    success: true,
    message: "All Categories",
    categories,
  });
};

//get single Category

const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category Not Found",
        category,
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Fetched",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error gettin the category",
      error,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Data deleted",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting category",
      error,
    });
  }
};

export {
  createCategoryController,
  updateCategoryController,
  getAllCategoriesController,
  singleCategoryController,
  deleteCategoryController,
};
