const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/add', (req, res, next) => {
  console.log('hello product route! add')
  const body = req.body;
  const user = new User(body);
  console.log("aha")
  user.save(err => {
    if (err) {
      next(err)
    } else {
      res.send(user)
    };
  });

});

module.exports = router;