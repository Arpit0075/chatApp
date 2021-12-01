const User = require("../Models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.send({ message: "User already exists" });

    //create new user

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const response = await newUser.save();
    res.send({ message: "User registered" });
  } catch (err) {
    //console.log(err.message);
    res.send(err.message);
  }
};

module.exports.login = async (req, res) => {
  //checking email if exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send({ message: "email not registered" });

  //checking password if email matches
  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid)
    return res.send({ message: "email or password does not match" });

  //if password matches we generate jwt token
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "5h" });
  res.send({ token: token });
};
