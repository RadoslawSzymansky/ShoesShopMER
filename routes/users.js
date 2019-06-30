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

router.get('/', (req, res, next) => {
  User.find({}, 'name', (err, users) => {
    if (err) return next(err);
    res.send(users);
  });
});

// tutaj wrzucic middlewar autoryzujący!
// oraz pobrac tylko to co trzeba, orazu. Koszyk. Ulubione.
// Hasla nie pokazywac. Zrobic nowy path do pobierania historii pkupowanyche
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  User.find({_id: id}, (err, users) => {
    if (err) return next(err);
    res.send(users);
  });
});

module.exports = router;