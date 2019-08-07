const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
  console.log(req.header('Authorization'))
  console.log('w  auth middlewar  ')
  if (req.header('Authorization')) {
    console.log('w ifie')
    const token = req.header('Authorization').replace('Bearer ', '')

    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
      const user = await User.findOne({ _id: data._id, 'tokens.token': token })
      if (!user) {
        console.log('w ifie nie ma uzytkownika')

        throw new Error()
      }
      req.user = user
      req.token = token
      console.log('w ifie po')

      next()
    } catch (error) {

      console.log('jestem w catch')
      res.status(401).send({ error: 'Not authorized to access this resource' })
    }
  } else {
    console.log('nie ma authorization')
    res.status(401).send({ error: 'Not authorized to access this resource !!!! bez auth ' })
}
}
module.exports = auth