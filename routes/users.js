
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

    res.status(201).send({ user, token });
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
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    };
    const token = await user.generateAuthToken();
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

module.exports = router