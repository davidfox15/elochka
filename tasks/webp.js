const { src } = require("gulp");
const webpConv = require("gulp-webp");
const changed = require("gulp-changed");
const multiDest = require("gulp-multi-dest");
const plumber = require("gulp-plumber");

module.exports = function webp(cb) {
  cb();
  // return src("src/images/*.+(png|jpg|jpeg)")
  //   .pipe(plumber())
  //   .pipe(
  //     changed("public/images", {
  //       extension: ".webp",
  //     }),
  //   )
  //   .pipe(webpConv())
  //   .pipe(multiDest(["src/images", "public/images"]));
};
