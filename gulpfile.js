'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var prefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var reload = browserSync.reload;

gulp.task('styles', function () {
	return gulp.src('project/scss/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({ browsers: ['last 2 versions', 'ie 9'] }))
		.pipe(gulp.dest('project/static/eventlapse'))
		.pipe(reload({stream:true}));
});

gulp.task('serve', function () {
	browserSync({
		proxy: {
			target: "http://127.0.0.1:8000"
		}
	});

	gulp.task('styles:watch', ['styles'], reload);
	gulp.watch('project/scss/**/*.scss', ['styles:watch']);
});

gulp.task('default', ['serve']);
