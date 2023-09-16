
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
      console.log(error);
    }
  
});

app.get('/products', async (req, res) => {

    try {
  
      let users = await products.findAll();
  
      if (!users) {
        res.send('No products found');
      }
  
      res.send(users);
  
    } catch (error) {
      res.json(error);
    }
  
});

app.get('/products/:id', async (req, res) => {
    
        try {
    
            let user = await products.findByPk(req.params.id);
        
            if (!user) {
                res.send('No product found');
            }
        
            res.send(user);
    
        } catch (error) {
            res.json(error);
        }
    
});

app.put('/products/:id', async (req, res) => {
        
            try {

                const product = await products.findByPk(req.params.id);

                if (!product) {
                    res.send('Product not found, no updates made');
                } else {
        
                    await product.update({
                        name: req.body.name,
                        description: req.body.description,
                        price: req.body.price,
                        category: req.body.category,
                        stock_quantity: req.body.stock_quantity,
                    });
                
                    res.send('product updated');

                }
        
            } catch (error) {
                res.json(error);
            }
        
});

app.delete('/products/:id', async (req, res) => {
            
    try {

        let product = await products.findByPk(req.params.id);
    
        if (!product) {
            res.send('No product found, no deletion made');
        } else {
    
            await product.destroy();
        
            res.send('product deleted');
        }

    } catch (error) {
        res.json(error);
    }
            
});

db.sequelize.sync().then((res) => {

  app.listen(port, () => {
    console.log(`Online-Store app listening at http://localhost:${port}`);
  })

})