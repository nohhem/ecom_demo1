const mongoose = require('mongoose');
const Product = require('./product');

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

//bakcup

// cartSchema.methods.addToCart = function(prodId) {
//   //check if the product is already exist ,=> ++quantity
//   //if the product dose not exsit then added it
//   const exists = (item) => item.productId == prodId;
//   const cartProductIndex=this.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1
//   if(cartProductIndex>=0){//the product exsit increase the quantity
//       this.items[cartProductIndex].qty++;
//   }else{//add the product
//       this.items.push({
//           productId:prodId,
//           qty:1
//       });
//   }
//   console.log('item added to cart :',this);
// };

cartSchema.methods.addToCart =async function(prodId) {
  //check if the product is already exist ,=> ++quantity
  //if the product dose not exsit then added it
  let availableQty=0;
  const exists = (item) => item.productId == prodId;
  const cartProductIndex=this.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1
  if(cartProductIndex>=0){//the product exsit increase the quantity
    availableQty=await getAvQty(prodId,this,this.items[cartProductIndex].qty+1);
    this.items[cartProductIndex].qty=availableQty;
  }else{//add the product
    availableQty=await getAvQty(prodId,this,1);
      this.items.push({
          productId:prodId,
          qty:availableQty
      });
  }
  console.log('cartSchema.methods.addToCart,item added to cart :',this);
};


//helper function
getAvQty = async function(prodId,cart,requestedQty){
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



cartSchema.methods.changeCartItemQuantity = function(prodId,newQty) { //most generec funtion
  //check if the product is already exist ,=> update the quantity
  //if the product dose not exsit then added it
  console.log('entered cartSchema.methods.changeCartItemQuantity ,with qty :',newQty);

  //to be sure just check if an item exsit already //insurance puposes 
  const exists = (item) => item.productId == prodId;
  const cartProductIndex=this.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1
  console.log((cartProductIndex>=0 && newQty!=0));
  if(cartProductIndex>=0 && newQty!=0){//the product exsit and the new quantity not zero,update the quantity
      this.items[cartProductIndex].qty=newQty
      console.log('cartSchema.methods.changeCartItemQuantity',this.items[cartProductIndex].qty);
      return this.items[cartProductIndex].qty;
  }else if(newQty<=0){
    console.log('splicing');
    this.items.splice(cartProductIndex,1);//delete the item from cart
    console.log('changeCartItemQuantity,an item deleted, the current items : ',this.items);
    return 0;
  }
  console.log('item added to cart :',this);
};

cartSchema.methods.deleteFromCart = function(prodId) {
  //my code
  //check if the product is already exist ,
  const exists = (item) => item.productId == prodId;
  const cartProductIndex=this.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1
      if(cartProductIndex >= 0){// mkae sure product exist then delete
        //Array.splice(position,num);
        this.items.splice(cartProductIndex,1);
        console.log('item deleted from cart :',this);
        return 0;
      }
      else {
        console.log('error','cartSchema.methods.deleteFromCart');
        return -1;
      }
};



module.exports = mongoose.model('Cart', cartSchema);

//for cart operation we have x cases :
//1- add item for the first time with qty =1;
//2- in cartpage increase the quantity by 1 or with a new quantity
//3- in cartpage decrease the quantity by 1 or with a new quantity
//4- in cartpage delete item from cart 
//cases of 2,3 can be summed into change qty of item
// thus we have removefrom cart and addtocart 'newitem' cases 1,4
//case 4 can be included with cases 3,4 also under change of qty concept , so we just check if new qty==0 then remove

// in summary we have 2 cases or function needed :
//1-add an item for the first time to the cart
//2-change the quantity from cartpage which can be: increase qty ,decrease qty, in case qty==0 remove the item from the cart and the view
