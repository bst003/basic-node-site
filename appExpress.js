const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use("/", express.static("public"));

app.use((req, res, next) => {
  console.log(req);
  res.status(404).sendFile(path.join(__dirname, "public/404.html"));
  //   res.status(404).send("Sorry can't find that!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
