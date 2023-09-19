const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.authSignup);
router.post("/login", authController.authLogin);
router.get("/authenticatetoken", authController.authToken);

module.exports = router;
