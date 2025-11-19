import { Category } from "../models/category.models.js";

const createCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    if (!name?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });
    }
    // Prevent duplicate category names
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists",
      });
    }
    const newCategory = new Category({
      name,
      description,
      isActive: isActive ?? true,
    });
    await newCategory.save();
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const updateCategory = async (req, res) => {
  // Implementation for updating a category
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name, description, isActive },
      { new: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
    }
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export { createCategory, getAllCategories, updateCategory, deleteCategory };
