const express = require("express");
const router = express.Router();

const authController = require("../../../controllers/api/v1/auth");

// localhost:800/api/v1/login
router.get("/", authController.index);
router.post("/login", authController.login);
router.post("/signup", authController.register);

module.exports = router;
