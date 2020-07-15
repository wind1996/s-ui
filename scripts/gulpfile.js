const path = require('path');
const gulp = require('gulp');
const rimraf = require('rimraf');
const concat = require('gulp-concat');
const less = require("gulp-less");
const csso = require('gulp-csso');
const rename = require("gulp-rename")
var ts = require('gulp-typescript');
const webpack = require('webpack-stream');
const filter = require("gulp-filter")

const esDir = path.resolve(__dirname, "./../es")
const distDir = path.resolve(__dirname, "./../dist")
console.log(esDir)

gulp.task("less-es", () => gulp
    .src(['../src/components/**/**/*.less'])
    .pipe(less({
        paths: [path.join(__dirname, "../")]
    }))
    .pipe(gulp.dest(esDir))
)

/*gulp.task("less-dist->css", () =>{
    /!*gulp
        .src(['../src/components/s-ui.less'], {sourcemaps: true})
        .pipe(less({
            paths: [path.join(__dirname, "../")]
        }))
        .pipe(gulp.dest(distDir, {sourcemaps: "."}))*!/
    }
)*/

gulp.task("less-dist", () => {
        const cssFilter = filter('**/*.css', {restore: true});
        return gulp.src(['../src/components/s-ui.less'], {sourcemaps: true})
            .pipe(less({
                paths: [path.join(__dirname, "../")]
            }))
            .pipe(gulp.dest(distDir, {sourcemaps: "."}))
            .pipe(cssFilter)
            .pipe(rename({suffix: '.min'}))
            .pipe(csso())
            .pipe(gulp.dest(distDir, {sourcemaps: "."}))
    }
)

// gulp.task("less-dist", gulp.series(gulp.parallel("less-dist->css", "less-dist->min-css")))

var tsProject = ts.createProject('../tsconfig.build2.json');

gulp.task("ts-dist", () => gulp
    .src(['../src/components/index.tsx'], {sourcemaps: true})
    .pipe(tsProject())
    .pipe(webpack({
        output: {
            filename: "s-ui.js"
        },
        devtool: 'source-map',
    }))
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(distDir, {sourcemaps: "."}))
)

// gulp.task("ts->dist", gulp.series(gulp.parallel("ts->dist-min", "ts->dist")))

gulp.task("build-dist", gulp.series(gulp.parallel("less-dist","ts-dist")))