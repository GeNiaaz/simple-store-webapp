const db = require("../models");
const { auth } = db;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function authSignup(req, res) {
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

async function authLogin(req, res) {
  try {
    const user = await auth.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      if (await bcrypt.compare(req.body.password, user.password_hash)) {
        // jwt generation
        const user = { username: req.body.username };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
      } else {
        return res.status(401).send("User not authenticated");
      }
    } else {
      return res.status(410).send("User not found");
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}

async function authToken(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;

      res.send("User token validated");
    });
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}

module.exports = {
  authSignup,
  authLogin,
  authToken,
};
