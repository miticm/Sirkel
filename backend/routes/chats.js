const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const config = require("../config/database");
const User = require("../models/user");
const Chat = require("../models/chat");

const router = express.Router();

getChatData = (chatId) => {
  
}

router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  console.log("made it");
  User.findById(req.user._id).populate('chats').lean().exec((err, user) => {
    console.log(user);
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    const chatsData = [];
    if (user.chats.length > 0) {
      user.chats.forEach((chat, i) => {

        chat.user1.id.equals(req.user._id)
          ? chat.recipient = chat.user2.username
          : chat.recipient = chat.user1.username;

        chatsData.push(chat);
        console.log(i);
        console.log(user.chats.length);

        if (i >= user.chats.length - 1) {
          console.log(chatsData)
          res.json({
            success: true,
            chatsData
          });
        }
      });
    }
  });
});

router.post("/add/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  User.findById(req.user._id, (err, sender) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    User.findById(req.params.id, (err, recipient) => {
      if (err) {
        res.json({
          success: false,
          msg: err
        });
      }

      const newChat = new Chat({
        user1: {
          id: sender._id,
          username: sender.username
        },
        user2: {
          id: recipient._id,
          username: recipient.username
        }
      });

      newChat.save((err, chat) => {
        sender.chats.push(chat);
        recipient.chats.push(chat);
        sender.save();
        recipient.save();

        res.json({
          success: true,
          msg: 'Created new chat'
        })
      });
    });
  });
});

module.exports = router;
