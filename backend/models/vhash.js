const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vHashSchema = new Schema({
  hash: {
    type: String,
    default: crypto.randomBytes(25).toString('hex'),
    required: true
  },
  userid: {
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: String
  }
});

const vHash= module.exports = mongoose.model("vHash", vHashSchema);


module.exports.getUserIDByvHash = function(hash, callback) {
    const query = {hash: hash};
    vHash.findOne(query, callback);
  }