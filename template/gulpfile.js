/**
 * @file gulpfile.js
 * @description
 * There are two tasks to manage your app: 'default' and 'build'
 */

var gulp = require('gulp'),
	connect = require('gulp-connect'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	del = require('del'),
	wiredep = require('wiredep').stream;

/**
 * @task default
 *
 * Local http web server on port 8080 by default
 *
 * @see https://www.npmjs.com/package/gulp-connect
 */
gulp.task('webserver', function() {
	connect.server({
		livereload: true,
		root: ['.', './app', '.tmp']
	});
});

/**
 * @task default, build
 *
 * Sass compilation
 * Run server reload on changes
 *
 * @see https://www.npmjs.com/package/gulp-sass
 */
gulp.task('sass', function() {
	gulp.src(['./app/styles/*.sass', './app/styles/**/*.sass'])
		.pipe(sass())
		.pipe(gulp.dest('.tmp/styles'))
		.pipe(connect.reload());
});

/**
 * @task default
 *
 * Run server reload on changes
 */
gulp.task('html', function() {
	return gulp.src(['./app/scripts/templates/*.html', './app/*.html'])
		.pipe(connect.reload());
});

/**
 * @task default
 *
 * Move scripts to .tmp folder
 * This is very useless, because local web server listen on app folder, not just .tmp.
 * But it is to anticipate a real useful 'build' task and 'serve' task
 *
 * Run server reload on changes
 */
gulp.task('scripts', function() {
	return gulp.src(['./app/scripts/*.js', './app/scripts/**/*.js'])
		.pipe(gulp.dest('.tmp/scripts'))
		.pipe(connect.reload());
});

/**
 * @task default
 * @see https://www.npmjs.com/package/gulp-watch
 */
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

/**
 * @task build
 *
 * Create the /dist folder
 * Move all .tmp content in the /dist folder
 * Move app/index.html too.
 */
gulp.task('dist', function() {
	del.sync(['dist/']);
	gulp.src(['.tmp/**', 'app/index.html'])
		.pipe(gulp.dest('dist/'))
});

/**
 * @task build
 * Move all bower deps in /dist folder
 */
gulp.task('dep-to-dist', function() {
	gulp.src(['bower_components/**'])
		.pipe(gulp.dest('dist/bower_components/'))
});

/**
 * @task default, build
 */
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
