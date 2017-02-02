module.exports = function(req, res, next) {
  var <%= model %> = req.model('<%= model %>')
  delete req.body._id
  
  <%= model %>.findOne({
      _id: req.params.id
    }).then(function(data) {
      data.remove()
      res.status(200).json({status: 'removed'})
    }).catch(function(err) {
      res.status(500).json(err)
    })
}
