'use strict';

// General

import gulp 						from 'gulp';
import data 						from 'gulp-data';
import install 					from 'gulp-install';
//import browserSync 			from 'browser-sync';
import notify 					from 'gulp-notify';
import fs 							from 'fs';


// PUG

import gulpif 					from 'gulp-if';
import pug 							from 'gulp-pug';
//import emitty 					from 'emitty';


// Sass

import sass 						from 'gulp-sass';
import sassGlob 				from 'gulp-sass-glob';
import autoprefixer 		from 'gulp-autoprefixer';
import csscomb 					from 'gulp-csscomb';


// JS

import babel 						from 'gulp-babel';
import browserify 			from 'browserify';
import source 					from 'vinyl-source-stream';
import babelify 				from "babelify";
import merge 						from 'gulp-merge-json';


// Init
const browserSync = require('browser-sync').create();
const emitty 			= require('emitty').setup('app', 'pug');

//- Install packages From package.json
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

gulp.task('JSON', () =>
	gulp.src('app/data/**/*.json')
		.pipe(merge())
		.on('error', notify.onError({
				title: 'JSOn Error',
				message: '<%= error.message %>'
		}))
		.pipe(gulp.dest('app/data'))
);

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

// JS

gulp.task('browserify', function() {
	return browserify('app/babel/app.js')
		.transform("babelify", {presets: ["es2015"]})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('app/js'));
});


gulp.task('babel', () => 
	gulp.src('app/babel/**/*.js')
		.pipe(babel())
		.on('error', notify.onError({
				title: 'Babel Error',
				message: '<%= error.message %>'
		}))
		.pipe(gulp.dest('app/js'))
);


// Your "watch" task
gulp.task('watch', () => {

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
	
	gulp.watch("app/sass/**/*.scss", gulp.series('sass'));

	gulp.watch("app/babel/**/*.js", gulp.series('babel'));

	gulp.watch("app/babel/app.js", gulp.series('browserify'));

	gulp.watch("app/data/*.json").on('all', gulp.series('JSON'));

});

gulp.task('default', gulp.series('watch'));