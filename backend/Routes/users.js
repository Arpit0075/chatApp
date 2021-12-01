const router = require("express").Router();
const UsersModule = require("../Module/usersModule");

router.post("/register", UsersModule.register);
router.post("/login", UsersModule.login);

module.exports = router;
