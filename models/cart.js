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



cartSchema.methods.changeCartItemQuantity = function(prodId,newQty) { //most generec funtion
  //check if the product is already exist ,=> update the quantity
  //if the product dose not exsit then added it
  console.log('entered cartSchema.methods.changeCartItemQuantity ,with qty :',newQty);

  //to be sure just check if an item exsit already //insurance puposes 
  const exists = (item) => item.productId == prodId;
  const cartProductIndex=this.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1

  if(cartProductIndex>=0){//the product exsit update the quantity
      this.items[cartProductIndex].qty=newQty
      console.log('cartSchema.methods.changeCartItemQuantity',this.items[cartProductIndex].qty);
      return this.items[cartProductIndex].qty;
  }else if(newQty<=0){
    this.items.splice(cartProductIndex,1);//delete the item from cart
    console.log('changeCartItemQuantity,an item deleted, the current items : ',this.items);
    return 0;
  }else{
    //add the product dose not exsit , we are adding it for the first time 

  }
  console.log('item added to cart :',this);
};

cartSchema.methods.addToCart = function(prodId,newQty) {
  //check if the product is already exist ,=> update the quantity
  //if the product dose not exsit then added it
  const exists = (item) => item.productId == prodId;
  const cartProductIndex=this.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1

  if(cartProductIndex>=0){//the product exsit update the quantity
      this.items[cartProductIndex].qty=newQty
  }else{//add the product
      this.items.push({
          productId:prodId,
          qty:newQty
      });
  }
  console.log('item added to cart :',this);
};

cartSchema.methods.deleteFromCart = function(prodId) {
  //my code
  //check if the product is already exist ,
  const exists = (item) => item.productId == prodId;
  const cartProductIndex=this.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1
      if(this.items[cartProductIndex].qty==1){
        //Array.splice(position,num);
        this.items.splice(cartProductIndex,1);
        console.log('item deleted from cart :',this);
        return 0;
      }else if (this.items[cartProductIndex].qty>1){
        this.items[cartProductIndex].qty--;
        console.log('item quantity decreased from cart :',this);
        return this.items[cartProductIndex].qty
      }else {
        console.log('error','cartSchema.methods.deleteFromCart');
        return -1;
      }
    
  
};

cartSchema.methods.deleteFromCart = function(prodId,newQty) {
  //my code
  //check if the product is already exist ,
  const exists = (item) => item.productId == prodId;
  const cartProductIndex=this.items.findIndex(exists);// if product exsit it will return its index, otherwise return -1
      if(this.items[cartProductIndex].qty==1){
        //Array.splice(position,num);
        this.items.splice(cartProductIndex,1);
        console.log('item deleted from cart :',this);
        return 0;
      }else if (this.items[cartProductIndex].qty>1){
        this.items[cartProductIndex].qty--;
        console.log('item quantity decreased from cart :',this);
        return this.items[cartProductIndex].qty
      }else {
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
