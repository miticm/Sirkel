const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const nodemailer = require('nodemailer')
const validator = require('email-validator')

const config = require("../config/database");
const User = require("../models/user");

const router = express.Router();

const serverURL = '159.65.160.251';
const senderAddr = 'sirkel2018@gmail.com';
const senderPass = 'CS307FALL2018'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         //type: 'OAuth2',
         user: senderAddr,
         pass: senderPass,
         /* Not currently working      
         clientId: "694756784067-vc5iffuta4l7dsmp4tbr6mfe6pu7vg1s.apps.googleusercontent.com",
         clientSecret: "ZFqI_-UqQcO0v039Lnokc11M",
         refreshToken: "1/lDtOcImPFA_o7up3QNeamQNIEn1c6nhLDhis_s9oEiWuRk8h0ZZWV96iMNFUXPBu",
         expires: 3600
        */
     }
 });




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
  if (!req.body.email || !req.body.username || !req.body.password) {
    return res.json({ success: false, msg: "one or more empty fields" });
  }
  if (!validator.validate(req.body.email)) {
    return res.json({ success: false, msg: "email is invalid" });
  }

  let newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) return res.json({ success: false, msg: "Failed to register user" });
    let verhash = new vHash({
      hash: crypto.randomBytes(20).toString('hex'),
      userid: user._id
    });
    verhash.save((err,h) => {
      if (err) return res.json({ success: false, msg: "hash did not save to database" });
    });
    let mail = {
      from: senderAddr,
      to: user.email,
      subject: 'Welcome to Sirkel!',
      html: '<p>Hello!\nWelcome to Sirkel, please verify your account using the link below:\n</p><a href=\"' 
      + serverURL + '/users/verify/' + verhash.hash +  '\">' + serverURL + '/users/verify/' + verhash.hash + '</a>'
      + '<p>\n\n- The Sirkel Team</p>'
    };
    transporter.sendMail(mail, function (err, dat) {
      if(err){ //email coulnd't be sent, delete new user and hash
        User.findByIdAndDelete(user._id);
        vHash.findByIdAndDelete(verhash._id);
        res.json({ success: false, msg: "error sending verification email" });
      }
      else {
        res.json({
          success: true,
          user: {
           id: user._id,
           username: user.username,
           email: user.email
          }
        });
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

router.post("/authenticate", (req, res, next) => {
  const { username, password } = req.body;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ success: false, msg: "user not found" });
    if (!user.verified) return res.json({ success: false, msg: "user not verified" });

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



module.exports = router;
