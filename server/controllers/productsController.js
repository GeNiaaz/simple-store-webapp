const db = require("../models");
const { products } = db;
const { check, validationResult } = require("express-validator");

async function createProduct(req, res) {
  check("price").isLength({ min: 10 });
  try {
    await products.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock_quantity: req.body.stock_quantity,
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send("product added");
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}

async function getAllProducts(req, res) {
  try {
    const allProducts = await products.findAll();
    if (!allProducts) {
      res.send("No products found");
    }
    res.send(allProducts);
  } catch (error) {
    res.json(error);
  }
}

async function getProductById(req, res) {
  try {
    let user = await products.findByPk(req.params.id);

    if (!user) {
      res.send("No product found");
    }

    res.send(user);
  } catch (error) {
    res.json(error);
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
    }
  } catch (error) {
    res.json(error);
  }
}

async function deleteProduct(req, res) {
  try {
    let product = await products.findByPk(req.params.id);

    if (!product) {
      res.send("No product found, no deletion made");
    } else {
      await product.destroy();

      res.send("product deleted");
    }
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
