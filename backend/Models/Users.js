const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 25,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minLength: 3,
      maxLength: 250,
      required: true,
    },
  },
  { collection: "users" } //we can specify the name for our collection here
);

const User = mongoose.model("UserModel", userSchema);
module.exports = User;
