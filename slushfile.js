var gulp = require('gulp')
var install = require('gulp-install')
var conflict = require('gulp-conflict')
var template = require('gulp-template')
var rename = require('gulp-rename')
var inquirer = require('inquirer')
var sequence = require('run-sequence')
var replace = require('gulp-replace')
var fs = require('fs')
var path = require('path')
var _ = require('lodash')

var answers = null
var ROUTES = /([ \t]+)\/\* -ROUTES \*\//

if(fs.existsSync(process.cwd() + '/model-crud.json')) {
  var config = require(process.cwd() + '/model-crud.json')
} else {
  var config = require('./config.json')
}


var prompts = [{
      type: 'input',
      name: 'modelName',
      message: 'Name of your new model'
    },{
      type: 'input',
      name: 'middlewareCreate',
      message: 'Middleware for creating(comma separated)'
    },{
      type: 'input',
      name: 'middlewareRead',
      message: 'Middleware for reading(comma separated)'
    },{
      type: 'input',
      name: 'middlewareUpdate',
      message: 'Middleware for updating(comma separated)'
    },{
      type: 'input',
      name: 'middlewareDelete',
      message: 'Middleware for deleting(comma separated)'
    }]

gulp.task('default', function (done) {
  inquirer.prompt(prompts,
  function (results) {
    answers = results
    answers.modelName =
      answers.modelName.charAt(0).toUpperCase() + answers.modelName.slice(1)
    sequence('models','crud', 'patch')
  });
});

gulp.task('models', function(done) {
  gulp.src(__dirname + '/templates/models/**.js')
    .pipe(template(answers))
    .pipe(rename('index.js'))
    .pipe(conflict('./'))
    .pipe(gulp.dest(`${config.modelsDir}/${answers.modelName.toLowerCase()}/`))
    .on('finish', function () {
      done();
    });
})

gulp.task('crud', function(done) {
  gulp.src(__dirname + '/templates/crud/**.js')
    .pipe(template(answers))
    .pipe(conflict('./'))
    .pipe(gulp.dest(`${config.apiDir}${answers.modelName.toLowerCase()}/`))
    .on('finish', function () {
      done();
    });
})

gulp.task('patch', function(done) {
  var kebab = _.kebabCase(answers.modelName)
  var route = `$1app.use('/${kebab}', require('./${kebab}'))\n$1/* -ROUTES */`
  return gulp.src(config.routesIndex)
    .pipe(replace(ROUTES, route))
    .pipe(gulp.dest(path.dirname(config.routesIndex)))
})
