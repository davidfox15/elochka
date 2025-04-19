const fs = require("fs");

// Задача для очистки папки dist
async function clean() {
  const dir = fs.existsSync("./public");
  if (dir) {
    fs.rmdirSync("./public", { recursive: true });
  }
}

module.exports = clean;
