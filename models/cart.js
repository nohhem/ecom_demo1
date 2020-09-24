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
};

cartSchema.methods.deleteFromCart = function(prodId) {
  //my code
  //check if the product is already exist ,=> ++quantity
  //if the product dose not exsit then added it
  const exists = (item) => item.productId == prodId;
  const cartProductIndex=this.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1
      if(this.items[cartProductIndex].qty==1){
        //Array.splice(position,num);
        Array.splice(cartProductIndex,1);
      }else{
        this.items[cartProductIndex].qty--;
      }
  
  console.log('item deleted to cart :',this);
};

module.exports = mongoose.model('Cart', cartSchema);
