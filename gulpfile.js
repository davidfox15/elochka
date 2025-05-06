const { watch, series, parallel, src, dest } = require("gulp");
const clean = require("./tasks/clean");
const html = require("./tasks/html");
const styles = require("./tasks/styles");
const scripts = require("./tasks/scripts");
const browserSync = require("browser-sync");
const server = require("./tasks/server");
const fonts = require("./tasks/fonts");
const images = require("./tasks/images");
const { convertHEIC, cleanHEIC } = require("./tasks/heic");
const webp = require("./tasks/webp");

// Экспорт задач
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.heic = convertHEIC;
exports.cleanheic = cleanHEIC;

function other_files() {
  return src(["src/favicon.*", "src/sitemap.xml", "src/robots.txt"]).pipe(
    dest("public"),
  );
}

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
  parallel(
    html,
    styles,
    scripts,
    fonts,
    other_files,
    series(convertHEIC, webp, images),
  ),
);

const buidlWithoutHEIC = series(
  clean,
  parallel(html, styles, scripts, fonts, other_files, series(webp, images)),
);

// Установка задачи по умолчанию
exports.default = build;

exports.buildnoheic = buidlWithoutHEIC;
