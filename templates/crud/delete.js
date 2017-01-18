module.exports = function(req, res, next) {
  var <%= modelName %> = req.model('<%= modelName %>')
  delete req.body._id

  var <%= modelName.toLowerCase() %> = new <%= modelName %>(req.body)
  <%= modelName.toLowerCase() %>.findOne({
      _id: req.params.id
    }).then(function(data) {
      data.remove()
      res.status(200).json({status: 'removed'})
    }).catch(function(err) {
      res.status(500).json(err)
    })
}
