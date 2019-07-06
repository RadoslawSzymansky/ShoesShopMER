
const express = require('express');
const User = require('../models/User');
const auth = require('../middlewars/auth');

const router = express.Router();

// @ GET route - get one user data
router.get('/users/:id', auth, (req, res, next) => {
  const { id } = req.params;
  
  User.find({ _id: id }, (err, users) => {
    if (err) return next(err);
    res.send(users);
  });
});

// @ POST /users
// Create a new user

router.post('/users', async (req, res) => {
  try {
    const isUserExsist = await User.findOne({email: req.body.email});
    if (isUserExsist) return res.status(400).json({ msg: 'User already exists' });

    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    const data = JSON.stringify({ user, token })
    const encodedData = encodeURIComponent(data);
    // res.status(201).send({ user, token });
    res.redirect('/email/send?data=' + encodedData);
  } catch (error) {
    res.status(400).send(error);
  };
});

// @ /users/login 
//Login a registered user

router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    console.log(user, 'elo')
    if (user.error) {
      return res.status(401).send({ error: user.error})
    };
    const token = await user.generateAuthToken();
    user.password = null;
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  };
});


router.get('/users/me', auth, async (req, res) => {
  // View logged in user profile
  res.send(req.user);
});

// Log user out of the application
router.post('/users/me/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.send()
    } catch (error) {
        res.status(500).send(error);
    };
});

// Log user out of all devices

router.post('/users/me/logoutall', auth, async(req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    };
});

//  @ route /users PATCH // adding to buscet or favorites!
router.patch('/users', auth, (req, res, next) => {
  User.findById(req.user.id, 'favorites productsInBuscet', (err, user) => {
    if (err) next(err);
    const {favoriteProductId, productToBuscet} = req.body;

    if (favoriteProductId) {
      if(user.favorites.indexOf(favoriteProductId) !== -1) {
        return res.json({err: 'This product is already in favorites'});
      };
      user.favorites = [...user.favorites, favoriteProductId];
    };
    if (productToBuscet) {
      user.productsInBuscet = [...user.productsInBuscet, productToBuscet];
    };
    if(!productToBuscet && !favoriteProductId){
      return res.json({
        err: 'Request body should contains: favoriteProductId, productToBuscet or both'
      });
    };
    user.save();
    res.json({user});
  });
});

module.exports = router