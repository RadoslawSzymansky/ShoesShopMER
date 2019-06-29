var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  userName: { type: String, required: [true, 'Imię jest wymagane'] },
  userLogin: { type: String, required: [true, 'Login jest wymagany'] },
  userEmail: { type: String, required: [true, 'Email jest wymagany'] },
  userPassword: { type: String, required: [true, 'Hasło jest wymagany'] },
  date: { type: Date, default: Date.now },
  favorites: { type: Array },
  productsInBuscet: { type: Array }
});

module.exports = mongoose.model('Users', User); 
