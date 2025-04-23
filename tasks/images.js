const { src, dest } = require("gulp");

function images() {
  return src("src/images/**/*", { encoding: false }).pipe(
    dest("public/images/"),
  );
}

module.exports = images;
