const router = require("express").Router();
const ChatsModule = require("../Module/chatsModule.js");

router.get("/getChats", ChatsModule.getChats);
router.post("/postChat", ChatsModule.postChat);

module.exports = router;
