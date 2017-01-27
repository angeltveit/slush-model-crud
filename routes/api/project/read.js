module.exports = function(req, res, next) {
  var Project = req.model('Project')
  Project.findOne({_id: req.params.id})
    .then(function(data){
      res.json(data)
    })
}
