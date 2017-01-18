var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    inquirer = require('inquirer'),
    sequence = require('run-sequence');
    config = require('./config.json')
var answers = null

var prompts = [{
      type: 'input',
      name: 'modelName',
      message: 'Name of your new model'
    },{
      type: 'input',
      name: 'middlewareCreate',
      message: 'Middleware for creating(restrict access etc)'
    },{
      type: 'input',
      name: 'middlewareRead',
      message: 'Middleware for reading(restrict access etc)'
    },{
      type: 'input',
      name: 'middlewareUpdate',
      message: 'Middleware for updating(restrict access etc)'
    },{
      type: 'input',
      name: 'middlewareDelete',
      message: 'Middleware for deleting(restrict access etc)'
    }]

gulp.task('default', function (done) {
  inquirer.prompt(prompts,
  function (results) {
    answers = results
    answers.modelName =
      answers.modelName.charAt(0).toUpperCase() + answers.modelName.slice(1)
    sequence('models','crud')
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
