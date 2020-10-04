const Product = require('../models/product');
const Category = require('../models/category');
const Cart = require('../models/cart');
const User = require('../models/user');

exports.getCart = (req, res, next) => {
  let catItems;
  let cart= new Cart();
  //get the cart either from session tempcart or user
  
  if(req.session.user){
    cart = new Cart(req.user.cart);
  }else if (req.session.tempCart) {
    cart = new Cart(req.session.tempCart)
  }
  cart
    .populate('items.productId')
    .execPopulate()
    .then(pcart => {
      //console.log('getCartProducts ,cart',pcart.items);
      catItems = pcart.items;
    }).then(() => {
      res.render('shop/view_cart', {
        pageTitle: 'Cart',
        cartProducts: catItems
      });
    })

};


  exports.postCartChangeQty = async (req, res, next) => {

    try{
    //async (due to client side request)
    const prodId = req.params.productId;
    console.log('exports.addToCart req.body',req.body.reqData )//from req.body we get the new qty
    let newQty = req.body.reqData

    const product = await Product.findById(prodId)
      //check if the user is logged in or not
      if(!req.user){
        //user is not logged ,thus check if the session has a cart already if not create a new one before adding the product
        if(!req.session.tempCart){
          //no Cart,create a new cart
          //console.log('no Cart,create a new one')
          // const cart = new Cart();
          // req.session.tempCart= cart;
          //console.log(req.session.tempCart,req.session.tempCart.items.length);
        }else{//we already have a cart in our session cast it to document
          req.session.tempCart=Cart.hydrate(req.session.tempCart);
        }
        //ourcart is ready ,now change the qty of item
         newupdatedQuantity = await req.session.tempCart.changeCartItemQuantity(prodId,newQty);
        console.log('the new udpated qty ,' ,newupdatedQuantity);
        //req.session.tempCart.addToCart(prodId);
        console.log(req.session.tempCart);
      }else{
          //user is loggedin => toDo
          const cart = new Cart(req.user.cart);
          newupdatedQuantity = await cart.changeCartItemQuantity(prodId,newQty);


      }
      res.status(200).json({message:'success',qty:newupdatedQuantity});
      

    }catch(err){
      //console.log('error',err);
      res.status(500).json({message:'Adding product failed'});
    }
  };


  exports.postCartDeleteItem = (req, res, next) => { 
    //delete from cart
    const prodId = req.params.productId;
    let items = req.session.tempCart.cartItems;
    if(req.session.tempCart){
      req.session.tempCart=Cart.hydrate(req.session.tempCart);
      remainingQty=req.session.tempCart.deleteFromCart(prodId);
      res.status(200).json({message:'Product deleted from cart succesfully!',qty:remainingQty});
    }
    //
  };

  exports.postAddToCart = async (req, res, next) => {
    try{
    //async (due to client side request)
    const prodId = req.params.productId;
    console.log('----------exports.addToCart ------------------------',req.body );
    console.log('our cart ',req.session.tempCart);
    product = await Product.findById(prodId)
      //check if the user is logged in or not
      if(!req.user){
        //user is not logged ,thus check if the session has a cart already if not create a new one before adding the product
        if(!req.session.tempCart){
          //no Cart
          //create a cart
          //console.log('no Cart,create a new one')
          const cart = new Cart();
          req.session.tempCart= cart;
          //console.log(req.session.tempCart,req.session.tempCart.items.length);
        }else{//we already have a cart in our session cast it to document
          req.session.tempCart=Cart.hydrate(req.session.tempCart);
        }
        //add product to cart
        await req.session.tempCart.addToCart(prodId);
        console.log('exports.postAddToCart finsihed ',req.session.tempCart);
        res.status(200).json({message:'success',qty:req.session.tempCart.items.length});
      }else if (req.session.user){ //we have user ,add to user cart
        req.user.addToCart(prodId);
        //save the cart of the user TODO
        // req.user.fullname='noh1fullname';//test toremove
        //await User.hydrate(req.session.user).save();
        res.status(200).json({message:'success',qty: req.session.user.cart.items.length});
      }
      
    }catch (err) {
      console.log('error',err);
      res.status(500).json({message:'Adding product failed'});
    }
  };
  
  

