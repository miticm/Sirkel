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
  attendees: {
    type: "array",
    required: true
  }
});


const Event = module.exports = mongoose.model("Event", EventSchema);

module.exports.getEventById = function(id, callback) {
  User.findById(id, callback);
};


module.exports.addEvent = function(newEvent, callback) {
    newEvent.save(callback);
};
