const express = require("express");
const router = express.Router();

// localhost:800/api/v1/login

router.use("/users", require("./auth"));

module.exports = router;
