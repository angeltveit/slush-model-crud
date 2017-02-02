module.exports = function(req, res, next) {
  var <%= model %> = req.model('<%= model %>')
  delete req.body._id

  var <%= camel %> = new <%= model %>(req.body)
  <%= camel %>.save().then(function(data){
      res.json(data)
    }).catch(function(err) {
      res.status(500).json(err)
    })
}
