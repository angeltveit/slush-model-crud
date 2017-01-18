module.exports = function(req, res, next) {
  var <%= modelName %> = req.model('<%= modelName %>')
  <%= modelName %>.findOne({_id: req.params.id})
    .then(function(data){
      res.json(data)
    })
}
