const del = require("del");

// Задача для очистки папки dist
async function clean() {
  await del(["public/**", "!public/video"]);
}

module.exports = clean;
