/**
 *
 */
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	del = require('del'),
	wiredep = require('wiredep').stream;

gulp.task('webserver', function() {
	connect.server({
		livereload: true,
		root: ['.', './app', '.tmp']
	});
});

gulp.task('sass', function() {
	gulp.src(['./app/styles/*.sass', './app/styles/**/*.sass'])
		.pipe(sass())
		.pipe(gulp.dest('.tmp/styles'))
		.pipe(connect.reload());
});

gulp.task('scripts', function() {
	return gulp.src(['./app/scripts/*.js', './app/scripts/**/*.js'])
		.pipe(gulp.dest('.tmp/scripts'))
		.pipe(connect.reload());
});

gulp.task('html', function () {
	gulp.src(['./*.html', './app/*.html', './app/scripts/templates/*.html'])
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('./app/styles/*.sass', ['sass']);
	gulp.watch('./app/styles/**/*.sass', ['sass']);
	gulp.watch('./app/scripts/*.js', ['scripts']);
	gulp.watch('./app/scripts/**/*.js', ['scripts']);
	gulp.watch('./*.html', ['html']);
	gulp.watch('./app/*.html', ['html']);
	gulp.watch('./app/*.html', ['html']);
	gulp.watch('./app/scripts/templates/*.html', ['html']);
});

gulp.task('dist', function() {
	del.sync(['dist/']);
	gulp.src(['.tmp/**', 'app/index.html'])
		.pipe(gulp.dest('dist/'))
});

gulp.task('dep-to-dist', function() {
	gulp.src(['app/bower_components/**'])
		.pipe(gulp.dest('dist/bower_components/'))
});

gulp.task('wiredep', function () {
	gulp.src('./app/index.html')
		.pipe(wiredep({
			"overrides": {
				"bootstrap": {
					"main": [
						"less/bootstrap.less",
						"dist/css/bootstrap.css",
						"dist/js/bootstrap.js"
					]
				}
			}
		}))
		.pipe(gulp.dest('./app'));
});

gulp.task('default', ['wiredep', 'sass', 'scripts', 'webserver', 'watch']);
gulp.task('build', ['wiredep', 'sass', 'scripts', 'dist', 'dep-to-dist']);