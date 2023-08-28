const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please enter user"],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please enter todo title"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "Please enter todo description"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
