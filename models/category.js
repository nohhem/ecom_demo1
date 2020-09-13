const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  path: {
    type: String
  }
});

module.exports = mongoose.model('Category', categorySchema);
