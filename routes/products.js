const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.post('/add', (req, res, next) => {
  console.log('hello product route! add')
  const body = req.body;
  const product = new Product(body);
  console.log("aha")
  product.save(err => {
    if (err) {
      // console.log(err)
      next(err)
    } else {
      res.send(product)
    };
  });

});

module.exports = router;