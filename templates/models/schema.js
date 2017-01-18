var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var <%= modelName %> = new Schema({
  // Fill in schema here
},{
  timestamps: true
})


Auction.plugin(deepPopulate, {})
module.exports = mongoose.model('<%= modelName %>', <%= modelName %>)
