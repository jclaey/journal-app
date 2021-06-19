const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'private'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Entry', EntrySchema);