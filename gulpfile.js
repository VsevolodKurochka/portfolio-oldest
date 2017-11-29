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

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () =>
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
);

// PUG

var locals = {
	portfolio: JSON.parse(fs.readFileSync('app/data/portfolio.json')),
	nav: JSON.parse(fs.readFileSync('app/data/nav.json')),
};

gulp.task('JSON', function() {
	return gulp.src('app/data/**/*.json')
    .pipe(merge())
    .on('error', notify.onError({
        title: 'JSOn Error',
        message: '<%= error.message %>'
    }))
    .pipe(gulp.dest('app/data'));
});
gulp.task('templates', () =>
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
);

gulp.task('htmlbeautify', () =>
	gulp.src('app/**/*.html')
		.pipe(htmlbeautify())
		.pipe(gulp.dest('app'))
);

// JS
gulp.task('babel', function(){
	return gulp.src('app/babel/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		})).on('error', notify.onError(function (error) {
				return 'ERROR. \n' + error;
			}))
		.pipe(gulp.dest('app/js'));
});


// Your "watch" task
gulp.task('watch', () => {

	cache.clearAll();

	// Shows that run "watch" mode
	global.watch = true;

	browserSync.init({
		server: "./app",
		notify: false
	});

	gulp.watch('app/**/*.pug', gulp.series('templates'))
		.on('all', (event, filepath) => {
			global.emittyChangedFile = filepath;
		});

	gulp.watch("app/**/*.html").on('all', browserSync.reload);

	gulp.watch("app/data/*.json").on('all', gulp.series('JSON'));
	
	gulp.watch("app/sass/**/*.scss", gulp.series('sass'));

	gulp.watch("app/babel/**/*.js", gulp.series('babel'));
});

gulp.task('default', gulp.series('watch'));