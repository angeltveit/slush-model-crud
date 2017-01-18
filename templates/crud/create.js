module.exports = function(req, res, next) {
  var <%= modelName %> = req.model('<%= modelName %>')
  delete req.body._id

  var <%= modelName.toLowerCase() %> = new <%= modelName %>(req.body)
  <%= modelName.toLowerCase() %>.save().then(function(data){
      res.json(data)
    }).catch(function(err) {
      res.status(500).json(err)
    })
}
