
function index(req, res, next) {
  req.model('<%= modelName %>').find()
    .then(function(data) {
      res.json(data)
    }).catch(function(err) {
      console.log(err)
    })
}


module.exports = require('express').Router()
  .get('/', index)
  .get('/:id', <% if(middlewareRead){%>[<%= middlewareRead %>],<%}%> require('./read'))
  .post('/', <% if(middlewareCreate){%>[<%= middlewareCreate %>],<%}%> require('./create'))
  .put('/:id', <% if(middlewareUpdate){%>[<%= middlewareUpdate %>],<%}%> require('./update'))
  .delete('/:id', <% if(middlewareDelete){%>[<%= middlewareDelete %>],<%}%> require('./delete'))
