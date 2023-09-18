const dotenv = require("dotenv");
const helmet = require("helmet");
const express = require("express");
const app = express();
const port = 3001;
const db = require("./models");
const xss = require("xss-clean");
const cors = require("cors");
const productsRoutes = require("./routes/productsRoutes");

dotenv.config({ path: "./.env" });
app.use(express.json());

// SECURE HTTP HEADERS
app.use(helmet());

// sanitization against XSS
app.use(xss());

// sanitization against SQL injection
app.use(require("sanitize").middleware);

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/products", productsRoutes);

db.sequelize.sync().then((res) => {
  app.listen(port, () => {
    console.log(`Online-Store app listening at http://localhost:${port}`);
  });
});
