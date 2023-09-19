const db = require("../models");
const { products } = db;
const { check, validationResult } = require("express-validator");
const logger = require("./logging");

async function createProduct(req, res) {
  try {
    await products.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock_quantity: req.body.stock_quantity,
    });

    const logMsg = `Product added, name: ${req.body.name}`;
    logger.productLogger.log("info", logMsg);

    res.send("product added");
  } catch (error) {
    res.json(error);
    const logMsg = `Error adding product, name: ${req.body.name}`;
    logger.productLogger.log("error", logMsg);
  }
}

async function getAllProducts(req, res) {
  try {
    const allProducts = await products.findAll();
    if (!allProducts) {
      res.send("No products found");
    }
    logger.productLogger.log("info", "All products retrieved");
    res.send(allProducts);
  } catch (error) {
    res.json(error);
    logger.productLogger.log("error", "Error retrieving all products");
  }
}

async function getProductById(req, res) {
  try {
    let user = await products.findByPk(req.params.id);

    if (!user) {
      res.send("No product found");
    }

    res.send(user);
    logger.productLogger.log("info", `Product retrieved, id: ${req.params.id}`);
  } catch (error) {
    res.json(error);
    logger.productLogger.log(
      "error",
      `Error retrieving product, id: ${req.params.id}`
    );
  }
}

async function updateProduct(req, res) {
  try {
    const product = await products.findByPk(req.params.id);

    if (!product) {
      res.send("Product not found, no updates made");
    } else {
      await product.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock_quantity: req.body.stock_quantity,
      });

      res.send("product updated");
      logger.productLogger.log("info", `Product updated, id: ${req.params.id}`);
    }
  } catch (error) {
    res.json(error);
    logger.productLogger.log(
      "error",
      `Error updating product, id: ${req.params.id}`
    );
  }
}

async function deleteProduct(req, res) {
  try {
    let product = await products.findByPk(req.params.id);

    if (!product) {
      res.send("No product found, no deletion made");
      logger.productLogger.log("info", "No product found, no deletion made");
    } else {
      await product.destroy();

      res.send("product deleted");
      logger.productLogger.log("info", `Product deleted, id: ${req.params.id}`);
    }
  } catch (error) {
    res.json(error);
    logger.productLogger.log(
      "error",
      `Error deleting product, id: ${req.params.id}`
    );
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
