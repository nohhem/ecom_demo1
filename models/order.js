
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  items: [
    {
      product: { type: Object, required: true },
      qty: { type: Number, required: true }
    }
  ],
  user: {
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  invoice: {
      _id: {
        type: Schema.Types.ObjectId,
        required: true
      },
      totalAmount: {
          type: Number,
          required: true
      },
      items: [
        {
          product: { type: Object, required: true },
          qty: { type: Number, required: true },
          productPrice: { type: Number, required: true }
        }
      ],
      date: Date
  }
});

module.exports = mongoose.model('Order', orderSchema);
