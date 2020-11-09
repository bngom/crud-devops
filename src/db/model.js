const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
    unique: false,
  },
  checked: {
    type: Boolean,
    required: false,
  }
});

const Item = mongoose.model('Item', schema)

module.exports = { Item };