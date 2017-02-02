module.exports = function(req, res, next) {
  var <%= camel %> = req.model('<%= model %>')
  <%= camel %>.findOneAndUpdate({
      _id: req.params.id
    }, req.body, {
      new: true
    })
    .then(function(data) {
      res.json(data)
    }).catch(function(err) {
      res.status(500).json(err)
    })
}
