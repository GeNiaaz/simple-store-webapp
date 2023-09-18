const db = require("../models");
const { auth } = db;
const bcrypt = require("bcrypt");

async function createAuth(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await auth.create({
      username: req.body.username,
      password_hash: hashedPassword,
      email: req.body.email,
    });

    res.send("User details saved");
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}

async function checkAuth(req, res) {
  try {
    const user = await auth.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      if (await bcrypt.compare(req.body.password, user.password_hash)) {
        res.send("User authenticated");
      } else {
        res.send("Not allowed");
      }
    } else {
      res.send("User not found");
      return res.status(400).send("User not found");
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}

module.exports = {
  createAuth,
  checkAuth,
};
