const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const config = require("../config/database");
const User = require("../models/user");
const rankUsers = require("../utility/rankUsers");

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
  (req, res) => {
    res.json({
      success: true,
      user: req.user
    });
  }
);

router.get(
  "/checkToken",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      user: req.user
    });
  }
);

router.get(
  "/ranked",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    User.find({})
      .lean()
      .exec((err, users) => {
        if (err) {
          res.json({
            success: false,
            msg: err
          });
        }

        if (req.user.survey) {
          const sortedUsers = rankUsers(users, req.user);
          if (sortedUsers) {
            res.json({
              success: true,
              users: sortedUsers
            });
          }
          else {
            res.json({
              success: false,
              msg: "Something went wrong!"
            });
          }
        } else {
          res.json({
            success: false,
            msg: "You have not taken the quiz yet!"
          });
        }
      });
  }
);

router.post(
  "/:id/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user._id, (err, addingUser) => {
      if (err) {
        res.json({
          success: false,
          msg: err
        });
      }

      User.findById(req.params.id, (err, addeeUser) => {
        if (err) {
          res.json({
            success: false,
            msg: err
          });
        }

        User.findById(req.params.id, (err, addeeUser) => {
          if (err) {
            res.json({
              success: false,
              msg: err
            });
          }

          let isConnection = false;
          addingUser.connections.forEach(connection => {
            if (connection.id.equals(addeeUser._id)) isConnection = true;
          });

          if (!isConnection) {
            addingUser.connections.push({
              id: addeeUser._id,
              username: addeeUser.username
            });
            addingUser.save();

            if (addingUser && addeeUser) {
              res.json({
                success: true
              });
            }
          } else {
            res.json({
              success: false,
              msg: "User is already connected."
            });
          }
        });
      });
    });
  }
);

router.post(
  "/survey",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne(req.user._id, (err, user) => {
      const userSurvey = Object.assign({}, req.body);

      if (userSurvey.shortQuestions) {
        if (userSurvey.shortQuestions.likesSports === 'Yes') {
          tags.push('sports');
          tags.push('intramural');
        }
    
        if (userSurvey.shortQuestions.likesMusic === 'Yes') {
          tags.push('music');
        }
    
        if (userSurvey.shortQuestions.likesVideoGames === 'Yes') {
          tags.push('video games');
        }
      }

      user.survey = userSurvey;
      user.save();
      res.send({ success: true });
    });
  }
);

module.exports = router;
