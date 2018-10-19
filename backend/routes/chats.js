const express = require("express");
const passport = require("passport");
const router = express.Router();
const Chat = require("../models/chat");
const User = require("../models/user");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Chat.findOne({ members: req.body.members.sort() }, (err, chat) => {
      if (err) res.send({ err: err, success: false });
      if (chat) {
        // chat already exist
        res.send({ id: chat._id, success: true });
      } else {
        // create new chat
        let chat = new Chat({
          members: req.body.members.sort()
        });
        chat.save((err, chat) => {
          if (err) res.send({ err: err, success: false });
          req.body.members.forEach(mem => {
            User.findById(mem, (err, user) => {
              user.chats.push(chat._id);
              user.save();
            });
          });
          res.send({ id: chat._id, success: true });
        });
      }
    });

    // Chat.findById("5bca27f56317ff2b36009368")
    //   .populate("members")
    //   .exec((err, chat) => {
    //     res.send(chat);
    //   });
  }
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("lol");
  }
);

module.exports = router;
