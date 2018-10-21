const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const config = require("../config/database");
const User = require("../models/user");

const router = express.Router();

<<<<<<< HEAD
const serverURL = '159.65.160.251';
const senderAddr = 'sirkel2018@gmail.com';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         type: 'oauth2',
         user: senderAddr,
         clientId: "694756784067-vc5iffuta4l7dsmp4tbr6mfe6pu7vg1s.apps.googleusercontent.com",
         clientSecret: "ZFqI_-UqQcO0v039Lnokc11M",
         refreshToken: "1/9icJuyTLoeMHWG4sV7H2H6Ee_PyqnBiQuRBiYmDKx1FgQlpsub-zLAdaEOPQw6i_",
     }
 });

=======
>>>>>>> master
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

<<<<<<< HEAD


router.get("/verify/:hsh", (req, res, next) => {
  vHash.findOne({hash: req.params.hsh}, (err,hash) => {
      if (err) throw err;
      if (!hash) return res.json({ success: false, msg: "hash not found " });
      
      User.findById(hash.userid, (err, user) => {
          if (err) throw err;
          user.verified = true;
          user.save();
          vHash.findByIdAndDelete(req.params.id, (err,hash) => {
              if (err) throw err;
              let time = new Date();
              console.log(user.username + " verified at " + time);
              let mail = {
                from: senderAddr,
                to: user.email,
                subject: 'Welcome to Sirkel!',
                html: '<p>Hello!\nYour account has been successfully verified!\nEnjoy!\n\n- The Sirkel Team</p>'
              };
              transporter.sendMail(mail, function (err, dat) {
                if(err){
                  res.json({ success: false, msg: "confirmation email not sent" });
                }
             });
          });
      });
      return res.json({success: true, msg: hash});
  });
});







=======
>>>>>>> master
module.exports = router;
