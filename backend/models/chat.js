const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  user1: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  user2: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  messages: [
    {
      content: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ]
});

const Chat = (module.exports = mongoose.model("Chat", ChatSchema));
