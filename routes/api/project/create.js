module.exports = function(req, res, next) {
  var Project = req.model('Project')
  delete req.body._id

  var project = new Project(req.body)
  project.save().then(function(data){
      res.json(data)
    }).catch(function(err) {
      res.status(500).json(err)
    })
}
