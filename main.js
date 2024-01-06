console.log("test");
const http = require("http");
const fs = require("fs");
const path = require("path");

// const data = fs.readFile(
//   path.join(__dirname, "/public", "about.html"),
//   "utf8",
//   (err, data) => {
//     if (err) {
//       throw err;
//     }

//     // console.log(data);
//     return data;
//   }
// );

const server = http
  .createServer((req, res) => {
    fs.readFile(path.join(__dirname, "/public", "about.html"), (err, data) => {
      if (err) {
        throw err;
      }

      res.write(data);
      return res.end();
    });

    console.log(req);
    // console.log("after req");

    const url = req.url;
    console.log(url);
  })
  .listen(5000, () => console.log("Server running..."));
