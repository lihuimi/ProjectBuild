//引入gulp模块
var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');

var htmlmin = require('gulp-htmlmin');

var livereload = require('gulp-livereload');

//js处理任务
gulp.task('minifyjs', function() {
    gulp.src('src/js/*.js') //操作的源文件
        .pipe(concat('built.js')) //合并到临时文件
        .pipe(gulp.dest('dist/js')) //生成到目标文件夹
        .pipe(rename({suffix: '.min'})) //重命名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

//less处理任务
gulp.task('lessTask', function () {
    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'))
        .pipe(livereload());
})
//css处理任务
gulp.task('cssTask', ['lessTask'], function () {
    gulp.src('src/css/*.css')
        .pipe(concat('built.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

//压缩html
gulp.task('htmlMinify', function() {
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

//定义默认任务
gulp.task('default', ['minifyjs', 'cssTask', 'htmlMinify']);

gulp.task('watch', ['default'], function() {

    livereload.listen();

    gulp.watch('src/js/*.js', ['minifyjs'])
    gulp.watch(['src/css/*.css','src/less/*.less'], ['cssTask']);

});