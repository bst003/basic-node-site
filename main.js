const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http
  .createServer((req, res) => {
    let url = req.url === "/" ? "/index.html" : req.url;

    const fileName = path.join(__dirname, "/public", url);

    const fileExt = path.extname(fileName);

    let contentType;
    if (fileExt === ".html") {
      contentType = "text/html";
    } else if (fileExt === ".css") {
      contentType = "text/css";
    } else if (fileExt === ".js") {
      contentType = "text/js";
    } else if (fileExt === ".ico") {
      contentType = "image/vnd.microsoft.icon";
    }

    fs.readFile(fileName, "utf8", (err, data) => {
      // In case of error
      if (err) {
        fs.readFile(
          path.join(__dirname, "/public", "/404.html"),
          "utf8",
          (err, data) => {
            if (err) {
              console.log("404 err");
              throw err;
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
          }
        );

        return;
      }

      res.writeHead(200, { "Content-Type": contentType });
      res.write(data);
      return res.end();
    });
  })
  .listen(5000, () => console.log("Server running..."));
