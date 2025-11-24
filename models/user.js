const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    githubId: {
      type: String,
      required: [true, "GitHub ID is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    displayName: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
  },
  { timestamps: true }
);

module.exports = require("mongoose").model("User", userSchema);
