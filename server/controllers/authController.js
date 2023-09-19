const db = require("../models");
const { auth } = db;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("./logging");
const { log } = require("winston");

async function authSignup(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await auth.create({
      username: req.body.username,
      password_hash: hashedPassword,
      email: req.body.email,
    });

    res.send("User details saved");
    logger.authLogger.log("info", `User added, username: ${req.body.username}`);
  } catch (error) {
    res.json(error);
    console.log(error);
    logger.authLogger.log(
      "error",
      `Error adding user, username: ${req.body.username}`
    );
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
        logger.authLogger.log(
          "info",
          `User authenticated, username: ${req.body.username}`
        );
      } else {
        logger.authLogger.log(
          "warn",
          `User password incorrect, username: ${req.body.username}`
        );
        return res.status(401).send("User not authenticated");
      }
    } else {
      logger.authLogger.log(
        "error",
        `User not found, username: ${req.body.username}`
      );
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

    if (token == null) {
      logger.authLogger.log("warn", "No token provided");
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        logger.authLogger.log("warn", `Token not valid, token: ${token}`);
        return res.sendStatus(403);
      }

      req.user = user;

      res.send("User token validated");
      logger.authLogger.log("info", `Token validated, token: ${token}`);
    });
  } catch (error) {
    res.json(error);
    console.log(error);
    logger.authLogger.log("error", `Error validating token, token: ${token}`);
  }
}

module.exports = {
  authSignup,
  authLogin,
  authToken,
};
