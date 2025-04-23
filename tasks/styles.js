const { src, dest } = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
// const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean-css");
const concat = require("gulp-concat");

function styles() {
  return (
    src("src/styles/*.css")
      .pipe(sourcemaps.init())
      // .pipe(autoprefixer()) // Добавление префиксов (для совместимости с  браузерами)
      .pipe(concat("style.css")) // Склеиваем все в один файл
      .pipe(clean()) // Минимизация CSS
      .pipe(sourcemaps.write("."))
      .pipe(dest("public/styles"))
  );
}

module.exports = styles;
