// 引入 gulp
var gulp = require('gulp');

// 引入组件
// var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');

// 检查脚本
// gulp.task('lint', function() {
//     gulp.src('./js/_*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./css'));
});

// 合并，压缩文件
// gulp.task('scripts', function() {
//     gulp.src(['./js/_howler.min.js','./js/_zepto.min.js','./js/_mod_defintion.js','./js/_mod_loadsource.js','./js/_mod_render.js','./js/_mod_*.js','./js/_page_*.js'])
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('./js'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./js'));
// });

// 默认任务
gulp.task('default', function() {
    //运行
    // gulp.run('sass', 'scripts');

    gulp.run('sass');

    //监听文件变化
    // gulp.watch(['./src/scss/*.scss'], function() {
    //     gulp.run('sass');
    // });
});
