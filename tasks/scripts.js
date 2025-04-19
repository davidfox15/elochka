const { src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const browserSync = require("browser-sync");

function scripts() {
  return src("src/scripts/*.js")
    .pipe(concat("all.js")) // Объединение всех JS-файлов в один (all.js)
    .pipe(uglify()) // Минимизация JS
    .pipe(rename({ suffix: ".min" })) // Добавление .min к имени файла
    .pipe(dest("public/scripts"))
    .pipe(browserSync.stream());
}

module.exports = scripts;
