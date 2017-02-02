module.exports = (req, res, next) => {
  const <%= camel %> = req.model('<%= model %>')
  <%= camel %>.findOne({_id: req.params.id})
    .then(data=> {
      res.json(data)
    })
}
