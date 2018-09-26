const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/database");

// Import models
const User = require("./models/user");

// Import routes
const users = require("./routes/users");

const app = express();

// Enable All CORS Requests
app.use(cors());

mongoose
  .connect(
    config.database,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", users);

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
