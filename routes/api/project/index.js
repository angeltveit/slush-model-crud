
function index(req, res, next) {
  req.model('Project').find()
    .then(function(data) {
      res.json(data)
    }).catch(function(err) {
      console.log(err)
    })
}


module.exports = require('express').Router()
  .get('/', index)
  .get('/:id', [requireUser], require('./read'))
  .post('/', [requireAdmin], require('./create'))
  .put('/:id', [requireAdmin], require('./update'))
  .delete('/:id', [requireAdmin], require('./delete'))
