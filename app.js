
const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');
const productsRoutes = require('./routes/productsRoutes');

app.use(express.json());
app.use(express.urlencoded({
extended: true
}));

app.use('/', productsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

db.sequelize.sync().then((res) => {
  app.listen(port, () => {
    console.log(`Online-Store app listening at http://localhost:${port}`);
  });
});