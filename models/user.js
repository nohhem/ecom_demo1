const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// const Cart = require('./cart');
// var cartSchema= new Cart();

// console.log(Cart);
// console.log('Cart is ',Cart);
// console.log('cartSchema is ',cartSchema);
// console.log('test ');

const cartSchema = new Schema({
  items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        qty: { type: Number, required: true }
      }
    ]

},{ _id : false });

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: cartSchema
},{ _id : false });

// console.log('userschema is ',typeof(userSchema));
// console.log('userschema is ',userSchema);

// userSchema.methods.addToCart = function(product) {
//   const cartProductIndex = this.cart.items.findIndex(cp => {
//     return cp.productId.toString() === product._id.toString();
//   });
//   let newQuantity = 1;
//   const updatedCartItems = [...this.cart.items];

//   if (cartProductIndex >= 0) {
//     newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//     updatedCartItems[cartProductIndex].quantity = newQuantity;
//   } else {
//     updatedCartItems.push({
//       productId: product._id,
//       quantity: newQuantity
//     });
//   }
//   const updatedCart = {
//     items: updatedCartItems
//   };
//   this.cart = updatedCart;
//   return this.save();
// };

// userSchema.methods.removeFromCart = function(productId) {
//   const updatedCartItems = this.cart.items.filter(item => {
//     return item.productId.toString() !== productId.toString();
//   });
//   this.cart.items = updatedCartItems;
//   return this.save();
// };

// userSchema.methods.clearCart = function() {
//   this.cart = { items: [] };
//   return this.save();
// };

module.exports = mongoose.model('User', userSchema);
