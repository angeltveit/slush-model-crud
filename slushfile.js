var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    inquirer = require('inquirer'),
    sequence = require('run-sequence');

var answers = null
gulp.task('default', function (done) {
  inquirer.prompt([
    {type: 'input', name: 'modelName', message: 'Name of your new model', default: gulp.args.join(' ')}, // Get app name from arguments by default
    {type: 'confirm', name: 'moveon', message: 'Continue?'}
  ],
  function (ans) {
    if (!ans.moveon) {
      return done()
    }
    answers = ans
    sequence('models','crud')
  });
});

gulp.task('models', function(done) {
  gulp.src(__dirname + '/templates/models/**.js')
    .pipe(template(answers))
    .pipe(rename('index.js'))
    .pipe(conflict('./'))
    .pipe(gulp.dest(`./models/${answers.modelName.toLowerCase()}/`))
    .on('finish', function () {
      done();
    });
})

gulp.task('crud', function(done) {
  gulp.src(__dirname + '/templates/crud/**.js')
    .pipe(template(answers))
    .pipe(conflict('./'))
    .pipe(gulp.dest(`./routes/api/${answers.modelName.toLowerCase()}/`))
    .on('finish', function () {
      done();
    });
})
