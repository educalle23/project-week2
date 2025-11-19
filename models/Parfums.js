const mongoose = require("mongoose");

const parfumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Perfume name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    fraganceFamily: {
      type: String,
      required: [true, "Fragrance family is required"],
      enum: {
        values: [
          "Floral",
          "Oriental",
          "Woody",
          "Fresh",
          "Citrus",
          "Fruity",
          "Aromatic",
        ],
        message: "{VALUE} is not a valid fragrance family",
      },
    },
    size: {
      type: Number,
      required: [true, "Size is required"],
      min: [1, "Size must be at least 1ml"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    gender: {
      type: String,
      required: [true, "Gender category is required"],
      enum: {
        values: ["Men", "Women", "Unisex"],
        message: "{VALUE} is not a valid gender category",
      },
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Parfum", parfumSchema);
