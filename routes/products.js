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

router.get('/shoes', (req, res, next) => {
  if (req.query.page  && req.query.limit) return next();
// jezeli chce sie tylko niektore z key tego obiektu product , nalezy podać drugi argument z ich nazwmai
  Product.find({})
  .then(products => {
    res.status(200).json(products);
  })
  .catch(err => next(err));
});

router.get('/shoes', (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  Product.paginate({}, { page, limit })
    .then(response => {
      res.send(response);
    })
    .catch(err => next(err));
});

module.exports = router;