// npm i gulpjs/gulp#4.0 gulp-if gulp-pug emitty browser-sync gulp-notify gulp-sass gulp-sass-glob gulp-autoprefixer gulp-babel
const gulp                            = require('gulp');
const data 														= require('gulp-data');
const install                         = require('gulp-install');
const gulpif                          = require('gulp-if');
const pug                             = require('gulp-pug');
const emitty                          = require('emitty').setup('app', 'pug');
const htmlbeautify                    = require('gulp-html-beautify');
const browserSync                     = require('browser-sync').create();
const notify                          = require('gulp-notify');

const path 														= require('path');
const fs 															= require('fs');
const cache 													= require('gulp-cache');
const merge 													= require('gulp-merge-json');

const gs = gulp.series;
const gp = gulp.parallel;

// Sass dependencies
const sass                            = require('gulp-sass');
const sassGlob                        = require('gulp-sass-glob');
const autoprefixer                    = require('gulp-autoprefixer');
const csscomb                         = require('gulp-csscomb');

// JS
const babel                           = require('gulp-babel');


//- Install packages inside package.json
//- Usage: npm install
gulp.src(['./package.json'])
	.pipe(install())

// Compile Markup
gulp.task('compile:markup', () => {
	gulp.src('app/**/*.pug')
		.pipe(gulpif(global.watch, emitty.stream(global.emittyChangedFile)))
		.pipe(data( () => {
			return JSON.parse(fs.readFileSync('app/data/combined.json'));
		}))
		.pipe(
			pug({
				pretty: true
			})
		)
		.on('error', notify.onError({
        title: 'PUG Error',
        message: '<%= error.message %>'
    }))
		.pipe(gulp.dest('app'))
});

// Compile JS
gulp.task('compile:scripts', () => {
	gulp.src('app/babel/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		})).on('error', notify.onError(function (error) {
				return 'ERROR. \n' + error;
			}))
		.pipe(gulp.dest('app/js'));
});

// Compile SASS
gulp.task('compile:styles', () => {
	gulp.src("app/sass/**/*.scss")
		.pipe(sassGlob())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		
		.pipe(csscomb())
		.pipe(autoprefixer({
			browsers: ['last 15 versions'],
			cascade: false
		}))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.stream())
});

// Compile JSON
gulp.task('compile:json', () => {
	gulp.src('app/data/**/*.json')
    .pipe(merge())
    .pipe(gulp.dest('app/data'))
});


// Watch Markup
gulp.task('watch:markup', () => {
	gulp.watch('app/**/*.pug', gulp.series('compile:markup'))
		.on('all', (event, filepath) => {
			global.emittyChangedFile = filepath;
		});

	gulp.watch("app/**/*.html").on('all', browserSync.reload);
});

// Watch JS
gulp.task('watch:scripts', () => {
	gulp.watch("app/babel/**/*.js", gulp.series('compile:scripts'));
});

// Watch SASS
gulp.task('watch:styles', () => {
	gulp.watch("app/sass/**/*.scss", gulp.series('compile:styles'));
});

// Watch JSON
gulp.task('watch:json', () => {
	gulp.watch("app/data/*.json").on('all', gulp.series('compile:json'));
});

gulp.task('compile:src', gp(
  'compile:markup',
  'compile:scripts',
  'compile:styles',
  'compile:json'
));

gulp.task('setup:server', () => {

	// Shows that run "watch" mode
	global.watch = true;

	browserSync.init({
		server: "./app",
		notify: false
	});

});

gulp.task('server', gs('compile:src', 'setup:server'));

gulp.task('watch', gp(
  'watch:markup',
  'watch:scripts',
  'watch:styles',
  'watch:json'
));

gulp.task('default', gp(
  'server',
  'watch'
));