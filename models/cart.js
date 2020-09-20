const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

cartSchema.methods.addToCart = function(prodId) {
    //my code
    //check if the product is already exist ,=> ++quantity
    //if the product dose not exsit then added it
    const exists = (item) => item.productId == prodId;
    const cartProductIndex=this.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1

    if(cartProductIndex>=0){//the product exsit increase the quantity
        this.items[cartProductIndex].qty++;
    }else{//add the product
        this.items.push({
            productId:prodId,
            qty:1
        });
    }
    console.log('item added to cart :',this);
    

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
};

module.exports = mongoose.model('Cart', cartSchema);
