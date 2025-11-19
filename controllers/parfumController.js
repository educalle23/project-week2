const Parfum = require("../models/parfums");

// GET all parfums
exports.getAllParfums = async (req, res) => {
  try {
    const parfums = await Parfum.find();
    res.status(200).json({
      success: true,
      count: parfums.length,
      data: parfums,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving perfumes",
      error: error.message,
    });
  }
};

// GET single parfum by ID
exports.getParfumById = async (req, res) => {
  try {
    const parfum = await Parfum.findById(req.params.id);

    if (!parfum) {
      return res.status(404).json({
        success: false,
        message: "Perfume not found",
      });
    }

    res.status(200).json({
      success: true,
      data: parfum,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid perfume ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Error retrieving perfume",
      error: error.message,
    });
  }
};

// POST create new parfum
exports.createParfum = async (req, res) => {
  try {
    const parfum = await Parfum.create(req.body);
    res.status(201).json({
      success: true,
      message: "Perfume created successfully",
      data: parfum,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }
    res.status(500).json({
      success: false,
      message: "Error creating perfume",
      error: error.message,
    });
  }
};

// PUT update parfum
exports.updateParfum = async (req, res) => {
  try {
    const parfum = await Parfum.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!parfum) {
      return res.status(404).json({
        success: false,
        message: "Perfume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Perfume updated successfully",
      data: parfum,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid perfume ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Error updating perfume",
      error: error.message,
    });
  }
};

// DELETE parfum
exports.deleteParfum = async (req, res) => {
  try {
    const parfum = await Parfum.findByIdAndDelete(req.params.id);

    if (!parfum) {
      return res.status(404).json({
        success: false,
        message: "Perfume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Perfume deleted successfully",
      data: {},
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid perfume ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Error deleting perfume",
      error: error.message,
    });
  }
};
