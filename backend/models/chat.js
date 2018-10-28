const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  name: {
    type: String
  },
  receivers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
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
        type: String,
        require: true
      }
    }
  ]
});

const Chat = (module.exports = mongoose.model("Chat", ChatSchema));
