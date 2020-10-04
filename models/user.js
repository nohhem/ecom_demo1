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



userSchema.methods.addToCart =async function(prodId,qty) {
  console.log('userSchema.methods.addToCart  qty',qty);
  try {
  let availableQty=0;
  const exists = (item) => item.productId == prodId;
  const cartProductIndex=this.cart.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1
  console.log('cartProductIndex',cartProductIndex);
  if(cartProductIndex>=0){//the product exsit increase the quantity
    availableQty=await getAvQty(prodId,this.cart,this.cart.items[cartProductIndex].qty+ qty );
    console.log('availableQty pp',availableQty);
    console.log('this.cart.items[cartProductIndex].qty',this.cart.items[cartProductIndex].qty);
    this.cart.items[cartProductIndex].qty=availableQty;
    console.log( this.cart.items[cartProductIndex].qty);
  }else{//add the new product
    availableQty=await getAvQty(prodId,this.cart,qty);
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

userSchema.methods.deleteFromCart = async function(prodId) {
  //my code
  //check if the product is already exist ,
  const exists = (item) => item.productId == prodId;
  const cartProductIndex=this.cart.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1
      if(cartProductIndex >= 0){// mkae sure product exist then delete
        //Array.splice(position,num);
        this.cart.items.splice(cartProductIndex,1);
        await this.save();
        console.log('item deleted from cart :',this.cart);
        return 0;
      }
      else {
        console.log('error','userschema.methods.deleteFromCart');
        return -1;
      }
};


userSchema.methods.changeCartItemQuantity = async function(prodId,newQty) { //most generec funtion
  //check if the product is already exist ,=> update the quantity
  //if the product dose not exsit then added it
  console.log('entered userschema.methods.changeCartItemQuantity ,with qty :',newQty);
  if(newQty <0){
    newQty=0;
  }
  const availableQty=await getAvQty(prodId,this.cart,newQty); // get the quantity we can add 
  //to be sure just check if an item exsit already //insurance puposes 
  const exists = (item) => item.productId == prodId;
  const cartProductIndex=this.cart.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1
  console.log((cartProductIndex>=0 && availableQty!=0));
  if(cartProductIndex>=0 && newQty!=0){//the product exsit and the new quantity not zero,update the quantity
      this.cart.items[cartProductIndex].qty=availableQty
      console.log('cartSchema.methods.changeCartItemQuantity',this.cart.items[cartProductIndex].qty);
      await this.save();
      return this.cart.items[cartProductIndex].qty;
  }else if(newQty<=0){
    console.log('splicing');
    this.cart.items.splice(cartProductIndex,1);//delete the item from cart
    await this.save();
    console.log('changeCartItemQuantity,an item deleted, the current items : ',this.cart.items);
    return 0;
  }
  console.log('item added to cart :',this);
};

//helper function
getAvQty = async function(prodId,cart,requestedQty){
  console.log('getAvQty,reqsted qty', requestedQty);
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
