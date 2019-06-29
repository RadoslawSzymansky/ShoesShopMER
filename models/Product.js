var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Product = new Schema({
  productName: { type: String },
  inStore: { type: Number },
  price: { type: Number },
  date: { type: Date, default: Date.now },
  avaibleSizes: { type: Array },
});

module.exports = mongoose.model('Products', Product); 
  