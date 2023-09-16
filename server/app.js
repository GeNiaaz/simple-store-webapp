const express = require("express");
const app = express();
const port = 3001;
const db = require("./models");
const cors = require("cors");
const productsRoutes = require("./routes/productsRoutes");

app.use(express.json());
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
