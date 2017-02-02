module.exports = (req, res, next)=> {
  const <%= model %> = req.model('<%= model %>')
  delete req.body._id

  const <%= camel %> = new <%= model %>(req.body)
  <%= camel %>.save().then(data=> {
      res.json(data)
    }).catch(err=> {
      res.status(500).json(err)
    })
}
