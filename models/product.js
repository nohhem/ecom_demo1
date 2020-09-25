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
  userId: { // only users who bought the product can makes a review 
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

productSchema.methods.calculateNewAvgRate = function(userRating ,lastReviewAvgRate){

  // avgRate = (userRating+lastreview.avgRate*count)/count

  let avgRate ;
  let reviewsCount ;

  //count of userRating
  reviewsCount = this.reviews.length + 1;
  console.log('reviewsCount : ' , reviewsCount)

  // avgRate = totalRate / countRate ;
  // avgRate = (userRating + (lastReviewAvgRate * countRate)) / countRate ;
  avgRate = (userRating + lastReviewAvgRate * reviewsCount) / reviewsCount ;
  console.log('avgRate in calculateAvgRate after calculation: ' , avgRate)
  return avgRate;
}

module.exports = mongoose.model('Product', productSchema);
