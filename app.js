
const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({
extended: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


db.sequelize.sync().then((res) => {

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })

})