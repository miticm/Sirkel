const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vHashSchema = new Schema({
  hash: {
    type: String,
    required: true
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const vHash = module.exports = mongoose.model("vHash", vHashSchema);