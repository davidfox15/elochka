const { watch, series, parallel } = require("gulp");
const clean = require("./tasks/clean");
const html = require("./tasks/html");
const styles = require("./tasks/styles");
const scripts = require("./tasks/scripts");
const browserSync = require("browser-sync");
const server = require("./tasks/server");
const fonts = require("./tasks/fonts");
const images = require("./tasks/images");
const convertHEIC = require("./tasks/heic");
const webp = require("./tasks/webp");

// Экспорт задач
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.heic = convertHEIC;

// Слежка за изменениями (опционально)
function watch_dev() {
  watch("./src/scripts/**/*.js", scripts).on("change", browserSync.reload);
  watch("./src/styles/**/*.css", styles).on("change", browserSync.reload);
  watch("./src/**/*.html", html).on("change", browserSync.reload);
  watch("./src/images/*", html).on("change", browserSync.reload);
}

exports.watch = series(
  clean,
  parallel(html, styles, scripts, fonts, images, webp),
  parallel(server, watch_dev),
);

// Задача по умолчанию (выполняется при команде "gulp")
const build = series(
  clean,
  parallel(html, styles, scripts, fonts, images, webp),
);

// Установка задачи по умолчанию
exports.default = build;
