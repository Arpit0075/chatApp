const Chat = require("../Models/Chats.js");

exports.postChat = async (req, res) => {
  try {
    const chat = new Chat({
      userName: req.body.userName,
      message: req.body.message,
    });
    const response = await chat.save();
    res.send(response);
  } catch (err) {
    //console.log(err);
    res.send(err.message);
  }
};

exports.getChats = async (req, res) => {
  try {
    const response = await Chat.find();
    res.json(response);
  } catch (err) {
    //console.log(err);
    res.status(401).send(err);
  }
};
