var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Project = new Schema({
  // Fill in schema here
},{
  timestamps: true
})


Project.plugin(deepPopulate, {})
module.exports = mongoose.model('Project', Project)
