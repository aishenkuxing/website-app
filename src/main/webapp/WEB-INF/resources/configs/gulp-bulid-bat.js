'use strict';

const gulp = require('gulp'),
	fs = require('fs'),
	stream = require('stream'),
	del = require('del'),
	path = require('path'),
	pump = require('pump'),
	es = require('event-stream'),
	scombiner = require('stream-combiner2');

const gutil = require('gulp-util'),
	gchanged = require('gulp-changed'),
	greplace = require('gulp-replace'), //gulp 替换文件        
	gwatch = require('gulp-watch'), //gulp watch文件   
	guglify = require('gulp-uglify'), //gulp 压缩文件        
	gconcat = require('gulp-concat'), //gulp 合并文件        
	gautoprefixer = require('gulp-autoprefixer'), //gulp css自适应    
	gcssmin = require('gulp-minify-css'), //gulp css压缩
	amdOptimize = require('amd-optimize'), //amd 合并打包
	grename = require('gulp-rename'), //gulp 重名文件
	gclean = require('gulp-clean'), //gulp 清除文件
	runSequence = require('run-sequence'), //独立运行任务
	plumber = require('gulp-plumber'), //防止管道中断
	gulpSequence = require('gulp-sequence'), //同步执行任务
	tmodjs = require('gulp-tmod'); //tmod插件

var resources = JSON.parse(fs.readFileSync('./require.moduler.json')); // require 打包模块 配置 满足amd范式

var __dev = resources.dev, //开发环境目录
	__devFile = __dev + '/**/*.*', //开发环境目录文件
	__devFileJs = __dev + '/**/*.js', //开发环境目录Js文件
	__devFileCss = __dev + '/**/*.css', //开发环境目录Css文件
	__devFileImage = __dev + '/**/*.{bmp,jpg,jpeg,png,gif}'; //开发环境目录Css文件

var __build = resources.build,
	__buildFile = resources.build + '/**/*.*'; //生成环境目录文件

/*
 * 监听打包html tmod 模板
 */
gulp.task('compile-tmodjs', function(cb) {
	var templatesDir = __dev + resources.templatesDir + '/';

	var templates = fs.readdirSync(templatesDir);

	var streams = templates.filter(function(template) {

		return !template.endsWith('.js');

	}).map(function(template) {

		var src = templatesDir + template + '/**/*.html';

		var buffer = gulp.src(src)
			.pipe(plumber())
			.pipe(tmodjs({
				escape: false,
				runtime: template + '.js',
				templateBase: templatesDir
			}))
			.pipe(gulp.dest(templatesDir));

		return buffer;
	});
	es.merge(streams).on('end', cb);
});

/*
 * 将lib下的文件打包到 bulid环境
 */
gulp.task('compile-libs', function(cb) {

	return gulp.src(__dev + resources.libDir + '/**/*.*')
		.pipe(plumber())
		.pipe(gulp.dest(__build + resources.libDir));

});

/*
 * 将template下的js打包到 bulid环境
 */
gulp.task('compile-templates', function(cb) {

	return gulp.src(__dev + resources.templatesDir + '/*.js')
		.pipe(plumber())
		.pipe(gulp.dest(__build + resources.templatesDir));

});

module.exports = function() {
	//编译绑定
	gulp.task('build-bat', function() {
		return runSequence('compile-tmodjs', ['compile-libs', 'compile-templates']);
	});
}