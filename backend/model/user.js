const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Value is Required"],
      unique: [true, "Email Must be Unique"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
    password: {
      type: String,
      required: true,
      minlength: [8, "please Provide a password of at least 8 character"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
