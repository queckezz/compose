var normalize = require('path').normalize
var coveralls = require('gulp-coveralls')
var exec = require('child_process').exec
var coverage = require('gulp-istanbul')
var sequence = require('run-sequence')
var docs = require('gulp-markdox')
var mocha = require('gulp-mocha')
var ext = require('gulp-ext')
var gulp = require('gulp')

gulp.task('test', function (cb) {
  return sequence('lint', 'mocha', cb)
})

gulp.task('test-cov', function (cb) {
  return sequence('instrument', 'test', 'coverage', cb)
})

gulp.task('ci', function (cb) {
  return sequence('test-cov', 'coveralls')
})

gulp.task('docs', function () {
  return gulp.src('lib/index.js')
    .pipe(docs())
    .pipe(ext.replace('.md'))
    .pipe(gulp.dest('docs'))
})

gulp.task('lint', function (cb) {
  var standard = normalize('./node_modules/.bin/standard')
  console.log(standard)
  exec(standard, function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('instrument', function () {
  return gulp.src('lib/*.js')
    .pipe(coverage())
    .pipe(coverage.hookRequire())
})

gulp.task('mocha', function () {
  return gulp.src('test/*.js')
    .pipe(mocha({
      reporter: 'dot',
      bail: true
    }))
})

gulp.task('coverage', function () {
  return gulp.src('test/*.js')
    .pipe(coverage.writeReports())
})

gulp.task('coveralls', function () {
  return gulp.src('coverage/lcov.info')
    .pipe(coveralls())
})
