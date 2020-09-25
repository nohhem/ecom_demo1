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

productSchema.methods.calculateNewAvgRate = function(newRate){
  
  console.log('calculateNewAvgRate  = function(newRate){ newRate', newRate)
  // avgRate = (userRating+lastreview.avgRate*count)/count
  //check if there is the first review then just return the same rate 
  if(this.reviews.length==0){ //no prvious review
    return parseFloat(newRate).toFixed(2);
  }else{//obtain info about the previous reviews and calcualte the new avg
  let avgRate =0 ;
  let reviewsCount =this.reviews.length;
  newRate = parseFloat(newRate).toFixed(2);
  let lastReviewAvgRate = this.reviews[this.reviews.length-1].avgRate; //get the last avgRate
  console.log(typeof(userRanewRateting),typeof(lastReviewAvgRate),typeof(reviewsCount),typeof((reviewsCount+1)));
  avgRate = (newRate + lastReviewAvgRate * reviewsCount) / (reviewsCount+1) ;
  console.log(avgRate);
  return parseFloat(avgRate).toFixed(2);
  }
}


// productSchema.methods.calculateNewAvgRate = function(userRating ,lastReviewAvgRate){

//   // avgRate = (userRating+lastreview.avgRate*count)/count
//   if(!lastReviewAvgRate){ //first review

//   }else{

//   }
//   let avgRate =0 ;
//   let reviewsCount =0;
//   userRating = parseFloat(userRating).toFixed(2);
//   //count of userRating
//   reviewsCount = this.reviews.length;
//   console.log('reviewsCount : ' , reviewsCount)

//   // avgRate = totalRate / countRate ;
//   // avgRate = (userRating + (lastReviewAvgRate * countRate)) / countRate ;

//   console.log(typeof(userRating),typeof(lastReviewAvgRate),typeof(reviewsCount),typeof(newCount));
  
//   avgRate = (userRating + lastReviewAvgRate * reviewsCount) / reviewsCount+1 ;
//   console.log('avgRate in calculateAvgRate after calculation: ' , avgRate)
//   return parseFloat(avgRate).toFixed(2);
// }

module.exports = mongoose.model('Product', productSchema);
