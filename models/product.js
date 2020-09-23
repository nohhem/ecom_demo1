const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');//for pagination from mongoose

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  images: [String],
  stockQty: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  categoryId: {
    type: Schema.Types.String,
    ref: 'Category',
    required: true
  },
  reviews: [{
    _id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    reviewComment: {
      type: String,
      required: true
    },
    userRating: {
      type: Number,
      required: true
    },
    avgRate: {
      type: Number,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }]

});

//for pagination from mongoose
productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);
