const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://tianchi:sirkel0@ds111063.mlab.com:11063/cs307-database",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
