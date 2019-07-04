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


// @ PUT route /api/shoes/:id  - BUYING  product!
router.put('/shoes/:id', auth, (req, res, next) => {
  const id = req.params.id;
  const { size, count  } = req.query;

  if (!size || !count) return res.status(400).json({ errMsg: 'Put all required queries'});

  Product.findById(id, "inStore avaibleSizes", (err, product) => {
    if (err) return next(err);

    const { avaibleSizes, inStore } = product;

    const isSizeAvaible = avaibleSizes.indexOf(size) !== -1;
    
    if (!isSizeAvaible) return res.status(400).json({errMsg: 'Size is not avaible'});

    if (count > inStore || count === "0"){ 
      res.status(400).json({ errMsg: 'Not enought products is store.' });
      return;
    };

    product.avaibleSizes = avaibleSizes.filter(e => e !== size);
    product.inStore = inStore - count;

    product.save()
      .then(updatedProduct => {
        const productId = updatedProduct._id;
        res.redirect(`${id}/success?productId=${productId}&size=${size}&count=${count}`);
      }) 
      .catch(err => next(err));
  });
});

// route /shoes/id/succes GET - redirected after succesfull buing product
// Adding to userHistory
router.get('/shoes/:id/success', auth, (req, res, next) => {
  const userId = req.user.id;
  const { productId, size, count } = req.query;

  User.findById(userId, (err, user) => {
    if (err) return next(err);

    user.purchasedHistory = [...user.purchasedHistory, { productId, size, count }];
    user.save();
    res.json({ productId, size, count });
  });
});

module.exports = router;