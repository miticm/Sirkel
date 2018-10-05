const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const config = require("../config/database");
const User = require("../models/user");

const router = express.Router();

router.get("/", (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    if (users) {
      res.json({
        success: true,
        users
      });
    }
  });
});

router.post("/register", (req, res, next) => {
  let newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) res.json({ success: false, msg: "Failed to register user" });
    else {
      const token = jwt.sign(user.toJSON(), config.secret, {
        expiresIn: "1d"
      });

      res.json({
        success: true,
        token: "JWT " + token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    }
  });
});

router.post("/authenticate", (req, res, next) => {
  const { username, password } = req.body;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ sucess: false, msg: "user not found" });

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: "1d"
        });

        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: "Wrong Password" });
      }
    });
  });
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
      }
    });
  }
);

router.get(
  "/checkToken",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      success: true
    });
  }
);

router.post(
  "/:id/add",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
      User.findById(req.user._id, (err, addingUser) => {
          if (err) {
              res.json({
                  success: false,
                  msg: err,
              });
          }

          User.findById(req.params.id, (err, addeeUser) => {
            if (err) {
              res.json({
                  success: false,
                  msg: err,
              });
            }

            addingUser.connections.push({
              id: addeeUser._id,
              username: addeeUser.username
            });
            addingUser.save();

            if (addingUser && addeeUser) {
              res.json({
                success: true,
              });
            }
          });
      });
});

module.exports = router;
