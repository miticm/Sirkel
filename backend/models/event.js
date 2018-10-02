const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: true
  },
  attendees: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      username: String
    }
  ],
  poster: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: String
  },
  byOrg: {
    type: Boolean,
    required: true
  }
});

const Event = module.exports = mongoose.model("Event", EventSchema);
