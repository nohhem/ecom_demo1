const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');//for pagination from mongoose

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
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
},{ timestamps: true , _id : false  });
// const Review = mongoose.model("Review", reviewSchema);

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
  reviews: [reviewSchema]
});
//for pagination from mongoose
productSchema.plugin(mongoosePaginate);
// const Product = mongoose.model("Product", productSchema);

// module.exports = {
//   Product: productSchema,
//   Review: reviewSchema
// };

productSchema.methods.calculateAvgRate = function(userRating){

  // avgRate = (userRating+lastreview.avgRate*count)/count
  let avgRate = 0;
  let totalRate = 0.000001;
  let countRate = 0.000001;
  //total userRating
  totalRate = totalRate + userRating;
  //count of userRating
  countRate = this.reviews.length;

  avgRate = totalRate / countRate ;
  // avgRate = (userRating + lastReviewAvgRate * countRate) / countRate ;

  return avgRate;
}

module.exports = mongoose.model('Product', productSchema);
