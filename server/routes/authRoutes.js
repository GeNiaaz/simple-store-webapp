const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// router.get("/", authController.getAllProducts);
// router.get("/:id", authController.getProductById);
router.post("/signup", authController.createAuth);
router.post("/login", authController.checkAuth);
// router.put("/:id", authController.updateProduct);

module.exports = router;
