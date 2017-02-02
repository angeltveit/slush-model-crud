var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var <%= model %> = new Schema({
  // Fill in schema here
},{
  timestamps: true
})


<%= model %>.plugin(deepPopulate, {})
module.exports = mongoose.model('<%= model %>', <%= model %>)
