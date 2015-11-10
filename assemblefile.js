var assemble = require('assemble');
var extname = require('gulp-extname');
var path = require('path');
var gulp = require('gulp')

gulp.copy=function(src,dest){
    return gulp.src(src, {base:"./src"})
        .pipe(gulp.dest(dest));
};

assemble.layouts('src/templates/layouts/*.hbs');

assemble.partials('src/templates/includes/*.hbs');

assemble.pages('src/templates/pages/*.hbs');


assemble.task('html', function() {
  assemble.src('src/templates/pages/*.hbs')
    .pipe(extname())
    .pipe(assemble.dest('dist/'));
});

assemble.task('assets', function() {
   gulp.copy(['src/js/**/*', 'src/css/**/*', 'src/images/**/*'], 'dist');
});

assemble.task('watch', function() {
    assemble.watch(['src/**/*'], ['html', 'assets']);
});

assemble.task('default', ['html', 'assets']);