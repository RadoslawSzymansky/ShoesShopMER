const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const auth = require('../middlewars/auth');

const router = express.Router();

// route /api/shoes POST - add new product
router.post('/shoes', (req, res, next) => {
  const body = req.body;
  const product = new Product(body);

  product.save(err => {
    if (err) {
      next(err);
    } else {
      res.send(product);
    };
  });
});

// @@ route /api/shoes GET - without pagination

router.get('/shoes', (req, res, next) => {
  if (req.query.page  && req.query.limit) return next();

  Product.find({})
  .then(products => {
    res.status(200).json(products);
  })
  .catch(err => next(err));
});

// @@ route /api/shoes GET - with pagination queires

router.get('/shoes', (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  Product.paginate({}, { page, limit })
    .then(response => {
      res.send(response);
    })
    .catch(err => next(err));
});


// @@ route /api/shoes GET - with pagination queires

router.get('/shoes/:id', (req, res, next) => {
  const id = req.params.id;

  Product.findById(id, (err, product) => {
    if (err) return next(err);
    res.json(product);
  })
});

module.exports = router;

