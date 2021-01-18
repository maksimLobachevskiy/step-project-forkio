"use strict";

const devFolder = "./src",
  distFolder = "./dist";

const path = {
  src: {
    scss: devFolder + "/scss/style.scss",
    js: devFolder + "/js/script.js",
    img: devFolder + "/img/**/*.{jpg,png,gif,svg,ico,webp}",
  },
  dist: {
    css: distFolder + "/css/",
    js: distFolder + "/js/",
    img: distFolder + "/img/",
  },
  watch: {
    html: "./*.html",
    scss: devFolder + "/scss/**/*.scss",
    js: devFolder + "/js/**/*.js",
    img: devFolder + "/img/**/*.*",
  },
};

const { src, dest, series, parallel, watch } = require("gulp");

const gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  del = require("del"),
  autoprefixer = require("gulp-autoprefixer"),
  cleanCSS = require("gulp-clean-css"),
  imagemin = require("gulp-imagemin"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify-es").default,
  concat = require("gulp-concat"),
  sass = require("gulp-sass");

//clear dist folder
const clear = () => del(distFolder);

//styles
const styles = () =>
  src(path.src.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 3 versions"],
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(dest(path.dist.css))
    .pipe(browserSync.stream());

//scripts
const scripts = () =>
  // src(["./src/js/jquery-3.5.1.min.js", "./src/js/script.js"])  * шаблон подключения js
  src(path.src.js)
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(dest(path.dist.js))
    .pipe(browserSync.stream());

// picture
const picture = () =>
  src(path.src.img)
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(dest(path.dist.img))
    .pipe(browserSync.stream());

//watcher
const watcher = () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
    notify: false,
  });
  watch(path.watch.html).on("change", browserSync.reload);
  watch(path.watch.js, scripts).on("change", browserSync.reload);
  watch(path.watch.scss, styles).on("change", browserSync.reload);
  watch(path.watch.img, picture).on("change", browserSync.reload);
};

exports.watcher = watcher;
exports.scripts = scripts;
exports.picture = picture;
exports.clear = clear;
exports.styles = styles;

exports.build = series(clear, parallel(styles, scripts, picture));
exports.dev = watcher;
