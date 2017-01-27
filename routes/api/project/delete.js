module.exports = function(req, res, next) {
  var Project = req.model('Project')
  delete req.body._id

  var project = new Project(req.body)
  project.findOne({
      _id: req.params.id
    }).then(function(data) {
      data.remove()
      res.status(200).json({status: 'removed'})
    }).catch(function(err) {
      res.status(500).json(err)
    })
}