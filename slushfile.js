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
var fs = require('fs')
var _ = require('lodash')

var modelName = {}
var args = []
var ROUTES = /([ \t]*)\/\* -ROUTES \*\//
var MODELS = /([ \t]*)\/\* -MODELS \*\//

if(fs.existsSync(process.cwd() + '/model-crud.json')) {
  var config = require(process.cwd() + '/model-crud.json')
} else {
  var config = require('./config.json')
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

gulp.task('default', function (done) {
  args = gulp.args
  console.log(args)
  if(!args.length) {
    console.log('Error: Please give a model name as first argument.')
    return
  }
  if(!args[1] || args[1].toLowerCase() !== 'es5') {
    args[1] = 'es6'
  }
  modelName = {
    input: gulp.args[0],
    camel: _.camelCase(args[0]),
    model: _.camelCase(args[0]).capitalize(),
    kebab: _.kebabCase(args[0])
  }
  sequence('models','crud', 'patch:route', 'patch:model')
});

gulp.task('models', function(done) {
  gulp.src(__dirname + '/templates/models/**.js')
    .pipe(template(modelName))
    .pipe(rename('index.js'))
    .pipe(conflict('./'))
    .pipe(gulp.dest(`${config.modelsDir}/${modelName.kebab}/`))
    .on('finish', function () {
      done();
    });
})

gulp.task('crud', function(done) {
  gulp.src(__dirname + `/templates/crud/${args[1]}/**.js`)
    .pipe(template(modelName))
    .pipe(conflict('./'))
    .pipe(gulp.dest(`${config.apiDir}${modelName.kebab}/`))
    .on('finish', function () {
      done();
    });
})

gulp.task('patch:route', function(done) {
  var route = `$1app.use('/${modelName.camel}', require('./${modelName.kebab}'))\n$1/* -ROUTES */`
  return gulp.src(config.routesIndex)
    .pipe(replace(ROUTES, route))
    .pipe(gulp.dest(path.dirname(config.routesIndex)))
})

gulp.task('patch:model', function(done) {
  var insert = `$1models.${modelName.model} = require('./${modelName.kebab}')\n$1/* -MODELS */`
  console.log(config.modelsIndex)
  return gulp.src(config.modelsIndex)
    .pipe(replace(MODELS, insert))
    .pipe(gulp.dest(path.dirname(config.modelsIndex)))
})
