const { watch, series, parallel } = require("gulp");
const clean = require("./tasks/clean");
const html = require("./tasks/html");
const styles = require("./tasks/styles");
const scripts = require("./tasks/scripts");
const browserSync = require("browser-sync");
const server = require("./tasks/server");

// Экспорт задач
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;

// Слежка за изменениями (опционально)
function watch_dev() {
  watch("./src/scripts/*.js", scripts).on("change", browserSync.reload);
  watch("./src/styles/*.css", styles).on("change", browserSync.reload);
  watch("./src/pages/*.html", html).on("change", browserSync.reload);
}

exports.watch = series(
  clean,
  parallel(html, styles, scripts),
  parallel(server, watch_dev),
);

// Задача по умолчанию (выполняется при команде "gulp")
const build = series(clean, parallel(html, styles, scripts));

// Установка задачи по умолчанию
exports.default = build;
