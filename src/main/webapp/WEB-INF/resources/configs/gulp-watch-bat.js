'use strict';

const gulp = require('gulp'),
	fs = require('fs'),
	stream = require('stream'),
	del = require('del'),
	path = require('path'),
	pump = require('pump'),
	es = require('event-stream'),
	scombiner = require('stream-combiner2'),
	chalk = require('chalk'); //输出颜色错误或者正确
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

var __dev = resources.dev, 										//开发环境目录
	__devFile = __dev + '/**/*.*', 								//开发环境目录文件
	__devFileJs = __dev + '/**/*.js', 							//开发环境目录Js文件
	__devFileCss = __dev + '/**/*.css', 						//开发环境目录Css文件
	__devFileImage = __dev + '/**/*.{bmp,jpg,jpeg,png,gif}'; 	//开发环境目录Css文件

var __build = resources.build,
	__buildFile = resources.build + '/**/*.*'; 							//生成环境目录文件

/*
 *  重新打包tmodjs 模板
 */
gulp.task('watch-tmodjs', function(cb) {
	gulp.watch(resources.templatesDir + '**/*.html').on('change', function(event) {
		console.log(chalk.green("---重新打包_templates模板开始---"));
		runSequence('compile-tmodjs');
	});
});

module.exports = function() {
	/**
	 * watch 事件绑定
	 */
	gulp.task('watch-bat', function() {
		return runSequence(['watch-tmodjs']);
	});
}