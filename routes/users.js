
const express = require('express');
const User = require('../models/User');
const auth = require('../middlewars/auth');

const router = express.Router();

// @ GET route - get one user data
router.get('/user/', auth, (req, res, next) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
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
    res.send({ user, token });
    
    /// tu uruchomic funckje wysyalajaca maile/

  } catch (error) {
    res.status(400).json({msg: error});
  };
});

// @ /users/login 
//Login a registered user

router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);

    if (user.error) {
      return res.status(401).json({ msg: user.error})
    };
    const token = await user.generateAuthToken();
    user.password = null;
    res.send({ user, token });
  } catch (error) {
    res.status(400).json({msg: error})
  };
});


router.get('/users/me', auth, async (req, res) => {
  // View logged in user profile
  res.send(req.user);
});

// Log user out of the application
router.post('/users/me/logout', auth,  async (req, res) => {
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

//  @ route /users PATCH // removing to  favorites!

//WORKING!
router.patch('/users/favorites/:id', auth, (req, res, next) => {
  const id = req.params.id;
  User.findById(req.user.id, 'favorites', (err, user) => {
    if(err) return next(err);
    const index = user.favorites.findIndex(e => 
      String(e) === String(id)
    );

    if (index === -1) { 
      return  res.status(400).send({err: 'Not exist in favorites'});
    };

    user.favorites.splice(index, 1);
    
    user.save();
    res.json({ user });

  });
});

// update basket = concat basket

router.patch('/users/basket/concat', auth, async (req, res, next) => {
  console.log("localBasket request")

  const { localeBasket } = req.body;
  console.log(typeof localeBasket)

  console.log(req.body)

  User.findById(req.user._id, 'productsInBuscet',async (err, user) => {
    if (err) return res.json({ msg: err });
    console.log("znalazlem uzytkownika")
    user.productsInBuscet = [...user.productsInBuscet, ...localeBasket];

    await user.save();
    res.json(user.productsInBuscet)
    console.log("wysylam zlaczone", user.productsInBuscet)

  });
})

//  @ route /users PATCH // adding to buscet !

router.patch('/users/basket/:id', auth, (req, res, next) => {
  const id = req.params.id;

  User.findById(req.user.id, 'productsInBuscet', (err, user) => {
    if (err) return next(err);

    const index = user.productsInBuscet.findIndex(e =>
      String(e.id) === String(id)
    );

    if (index === -1) {
      return res.status(400).send({ err: 'Not exist in basket' });
    };

    user.productsInBuscet.splice(index, 1);

    user.save();
    res.json({ user });
  });
});

// get Favorites

router.get('/users/favorites', auth, async (req, res) => {
  console.log("favorites dostalem")

  User.findById(req.user._id, 'favorites', (err, user) => {

    if (err) return res.json({ msg: err });

    res.json(user.favorites)
    console.log("favorites wysylam")

  });
});

router.get('/users/basket', auth, async (req, res) => {

  User.findById(req.user._id, 'productsInBuscet', (err, user) => {

    if(err) return res.json({msg: err});

    res.json(user.productsInBuscet)
  });
});


module.exports = router;