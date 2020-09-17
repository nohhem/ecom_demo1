const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  category_title: {
    type: String,
    required: true
  },
  path: {
    type: String
  },
  parent: {
    type: String
  }
});

module.exports = mongoose.model('Category', categorySchema);
