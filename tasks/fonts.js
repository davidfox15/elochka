const { src, dest } = require("gulp");
// const ttf2woff2 = require("gulp-ttf2woff2");
// const ttf2woff = requier("gulp-ttf2woff");

function ttf(done) {
  src("src/fonts/**/*.ttf", { encoding: false, removeBOM: false }).pipe(
    dest("public/fonts/"),
  );
  // src(["src/fonts/**/*.ttf"], {
  //   encoding: false, // Important!
  //   removeBOM: false,
  // })
  //   .pipe(ttf2woff2())
  //   .pipe(dest("public/fonts/"));
  //
  // src(["src/fonts/**/*.ttf"], {
  //   encoding: false, // Important!
  //   removeBOM: false,
  // })
  //   .pipe(ttf2woff())
  //   .pipe(dest("public/fonts/"));

  done();
}

module.exports = ttf;
// export default ttf;
