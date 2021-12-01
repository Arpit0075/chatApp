require("dotenv").config();

exports.connect = () => {
  const localUrl = "mongodb://localhost:27017/chatApp";
  const deployedUrl = process.env.MONGODB_URL;
  try {
    const mongoose = require("mongoose");
    mongoose.connect(deployedUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected...");
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
