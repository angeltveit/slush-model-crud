
function index(req, res, next) {
  req.model('<%= model %>').find()
    .then(function(data) {
      res.json(data)
    }).catch(function(err) {
      console.log(err)
    })
}


module.exports = require('express').Router()
  .get('/', index)
  .get('/:id', require('./read'))
  .post('/', require('./create'))
  .put('/:id', require('./update'))
  .delete('/:id', require('./delete'))
