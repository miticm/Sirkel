const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/database");
const socketio = require("socket.io");

// Import models
const User = require("./models/user");
const Event = require("./models/event");
// Import routes
const users = require("./routes/users");
const orgs = require("./routes/orgs");
const events = require("./routes/events");
const chats = require("./routes/chats");

var app = express();
// Enable All CORS Requests
app.use(cors());


const server = app.listen(5000, () => {
  console.log("http://localhost:5000");
});

const io = socketio(server);

io.on('connection', function (socket) {
  console.log("Connected with: " + socket.id);
});


mongoose
  .connect(
    config.database,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req,res,next){
  req.io = io;
  next();
});

app.use("/users", users);
app.use("/orgs", orgs);
app.use("/events", events);
app.use("/chats", chats);

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
