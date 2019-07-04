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


// @ PUT route /api/shoes/:id 
router.put('/shoes/:id', (req, res, next) => {
  const id = req.params.id;
  const { size, count  } = req.query;

  if (!size || !count) return res.status(400).json({ errMsg: 'Put all required queries'});

  Product.findById(id, "inStore avaibleSizes", (err, product) => {
    if (err) return next(err);

    const { avaibleSizes, inStore } = product;

    const isSizeAvaible = avaibleSizes.indexOf(size) !== -1;
    
    if (!isSizeAvaible) return res.status(400).json({errMsg: 'Size is not avaible'});

    if (count > inStore || count === 0){ 
      res.status(400).json({ errMsg: 'Not enought products is store.' });
      return;
    };

    product.avaibleSizes = avaibleSizes.filter(e => e !== parseInt(size));
    product.inStore = inStore - count;

    product.save()
      .then(updatedProduct => {
        // res.json({updatedProduct, size, count});
        const productToSend = encodeURIComponent(updatedProduct);

        res.redirect(`${id}/success?data=${productToSend}&size=${size}&count=${count}`);
          // czy tu zrobić redirect?? 

      }) 
      .catch(err => next(err));
      
  });
});

router.all('/shoes/:id/success', (req, res, all) => {
  const { data, size, count } = req.query;

  const updatedProduct = decodeURIComponent(data)
  console.log(updatedProduct)
  res.json({ updatedProduct, size, count });
})

module.exports = router;