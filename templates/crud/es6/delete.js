module.exports = (req, res, next)=> {
  const <%= model %> = req.model('<%= model %>')
  delete req.body._id

  <%= model %>.findOne({
      _id: req.params.id
    }).then(data=> {
      data.remove()
      res.status(200).json({status: 'removed'})
    }).catch(err=> {
      res.status(500).json(err)
    })
}
