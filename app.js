
const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');
const { products } = require('./models');

app.use(express.json());
app.use(express.urlencoded({
extended: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/products', async (req, res) => {

    try {
        console.log(req);
        await products.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock_quantity: req.body.stock_quantity,
        });
  
        res.send('product added');
  
    } catch (error) {
      res.json(error);
    //   console.log(error);
    }
  
  });

db.sequelize.sync().then((res) => {

  app.listen(port, () => {
    console.log(`Online-Store app listening at http://localhost:${port}`);
  })

})