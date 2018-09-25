const express = require("express");
const router = express.Router();
const authCtrl = require("../controller/auth/auth-ctrl.js");

//user creatiion
router.post("/new", authCtrl.register);
//user login
router.post("/login", authCtrl.login)

module.exports = router;