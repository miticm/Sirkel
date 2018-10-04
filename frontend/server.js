const express = require("express");
const app = express();
const path = require("path");
const distPath = path.resolve(__dirname, "dist");

app.use(express.static(distPath));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
