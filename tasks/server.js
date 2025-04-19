const browserSync = require("browser-sync");

// Локальный сервер
const server = () => {
  browserSync.init({
    server: {
      baseDir: "./public",
    },
    callbacks: {
      ready: function (err, browserSync) {
        browserSync.addMiddleware("*", function (req, res) {
          res.writeHead(302, {
            location: "404.html",
          });
          res.end("Redirecting!");
        });
      },
    },
    port: 3001,
    browser: "chrome",
    // logPrefix: "BS-HTML:",
    // logLevel: "info",
    // logConnections: true,
    // logFileChanges: true,
    open: true,
  });
};

module.exports = server;
