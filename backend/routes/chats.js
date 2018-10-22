const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const Chat = require("../models/chat");

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Chat.findOne({ receivers: req.body.receivers.sort() }, (err, chat) => {
      if (err) throw err;
      if (chat) {
        // chat already exist
        console.log("chat already exist");
        res.send({ id: chat._id, success: true });
      } else {
        // create new chat
        let chat = new Chat({
          receivers: req.body.receivers.sort(),
          messages: []
        });
        // save chat
        chat.save((err, newchat) => {
          if (err) throw err;
          // successfully saved
          console.log("new chat");
          req.body.receivers.forEach(receiver => {
            User.findById(receiver, (err, user) => {
              user.chats.push(newchat._id);
              user.save((err, user) => {
                if (err) throw err;
              });
            });
          });
          res.send({ id: chat._id, success: true });
        });
      }
    });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user._id)
      .populate({
        path: "chats",
        populate: {
          path: "receivers"
        }
      })
      .exec((err, user) => {
        res.send({ success: true, chatsList: user.chats });
      });
  }
);
module.exports = router;
