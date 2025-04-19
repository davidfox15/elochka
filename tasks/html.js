const { src, dest } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const fileinclude = require("gulp-file-include");

function html() {
  return src("./src/pages/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      }),
    )
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true })) // Минимизация HTML
    .pipe(dest("public"));
}

module.exports = html;
