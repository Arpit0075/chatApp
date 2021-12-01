const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    userName: {
      type: String,
      minLength: 1,
      maxLength: 25,
      required: true,
    },

    message: {
      type: String,
      minLength: 1,
      maxLength: 100,
      required: true,
    },
  },
  { timestamps: true }
  //we can specify the name for our collection here
);
//in case we have timestamps we can specify collection name below, it will be plural of the mentioned name
const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
