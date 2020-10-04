const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cart = require('../models/cart');
const Product = require('../models/product');

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

}, { _id: false });

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
});


userSchema.methods.mergeCart = function(cart1) {
  //loop over the basic array and see if there is similartiy
  let useritems =[...this.cart.items]
  let cartitems = [...cart1.items];
  let finalarr = { };

  Object.entries(useritems).forEach(entry => {
    const [key, value] = entry;
    finalarr[value.productId]=value.qty;
  });
  Object.entries(cartitems).forEach(entry => {
    const [key, value] = entry;
    if(finalarr[value.productId]){
    finalarr[value.productId]=value.qty+finalarr[value.productId];
    }else{
    finalarr[value.productId]=value.qty; //added for the 
    }
  });
  let finalItems=[];
  console.log('typeof(this.cart.items[0].productId),',typeof(this.cart.items[0].productId),this.cart.items[0].productId);
  // this.cart.items=[];
  Object.entries(finalarr).forEach(entry => {
    const [key, value] = entry;
    finalItems.push({
    productId:key,
    qty:value
    })
  });

  let newCart = new Cart(
    {items:finalItems}
  );
  this.cart=newCart; //assign the new merged cart to the user
  return this.save();
  }



userSchema.methods.addToCart =async function(prodId) {

  try {
  let availableQty=0;
  const exists = (item) => item.productId == prodId;
  const cartProductIndex=this.cart.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1
  console.log('cartProductIndex',cartProductIndex);
  if(cartProductIndex>=0){//the product exsit increase the quantity
    availableQty=await getAvQty(prodId,this.cart,this.cart.items[cartProductIndex].qty+1);
    console.log('availableQty',availableQty);
    console.log('this.cart.items[cartProductIndex].qty',this.cart.items[cartProductIndex].qty);
    this.cart.items[cartProductIndex].qty=availableQty;
    console.log( this.cart.items[cartProductIndex].qty);
  }else{//add the new product
    availableQty=await getAvQty(prodId,this.cart,1);
    console.log('this.cart.items before pushing new product',this.cart.items);
      this.cart.items.push({
          productId:prodId,
          qty:availableQty
      });
      console.log('this.cart.items after pushing new product',this.cart.items);
      console.log('userschema.methods.addToCart ,this.cart.items ',this.cart.items);
  }
  await this.save();
  //console.log('cartSchema.methods.addToCart,item added to cart :',this.cart); 
  } catch (error) {
    console.log(error);
  }
};

//helper function
getAvQty = async function(prodId,cart,requestedQty){
  console.log('getAvQty', prodId);
  try{
  const product = await Product.findById(prodId);
  const availableQty =product.stockQty;
  console.log('availableQty',availableQty);
  const exists = (item) => item.productId == prodId;
  const cartProductIndex=cart.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1
  if(availableQty>=requestedQty){
    return requestedQty;
  }else{
    return availableQty;
  }
  }
  catch(error){
    console.log(error);
  }
};

module.exports = mongoose.model('User', userSchema);
