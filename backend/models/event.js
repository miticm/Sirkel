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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  ],
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  byOrg: {
    type: Boolean,
    required: true
  }
});

const Event = module.exports = mongoose.model("Event", EventSchema);
