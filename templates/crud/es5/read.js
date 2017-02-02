module.exports = function(req, res, next) {
  var <%= camel %> = req.model('<%= model %>')
  <%= camel %>.findOne({_id: req.params.id})
    .then(function(data){
      res.json(data)
    })
}
