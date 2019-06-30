var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const mongoosePagination = require('mongoose-paginate')

var Product = new Schema({
  productName: { type: String },
  inStore: { type: Number },
  price: { type: Number },
  date: { type: Date, default: Date.now },
  avaibleSizes: { type: Array },
});

Product.plugin(mongoosePagination)
module.exports = mongoose.model('Products', Product); 
  