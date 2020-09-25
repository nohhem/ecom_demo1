exports.getCart = (req, res, next) => {
    let catItems ;
    if(req.session.tempCart){
    let cart =Cart.hydrate(req.session.tempCart);
    cart
    .populate('items.productId')
    .execPopulate()
    .then(pcart => {
      //console.log('getCartProducts ,cart',pcart.items);
      catItems= pcart.items;
    }).then(()=>{
      res.render('shop/view_cart', {
        pageTitle: 'Cart',
        cartProducts:catItems
      });
    })
    }else{
      res.render('shop/view_cart', {
        pageTitle: 'Cart',
        cartProducts:[]
      });
    }
  };
  exports.postCartDeleteItem = (req, res, next) => { 
    //delete from cart
    const prodId = req.params.productId;
    let items = req.session.tempCart.cartItems;
    if(req.session.tempCart){
      req.session.tempCart=Cart.hydrate(req.session.tempCart);
      remainingQty=req.session.tempCart.deleteFromCart(prodId)
      res.status(200).json({message:'Product deleted from cart succesfully!',qty:remainingQty});
    }
    //
  };
  
  
  
  
  exports.addToCart = (req, res, next) => {
    //async (due to client side request)
    const prodId = req.params.productId;
    console.log('exports.addToCart req.body',req.body )
    Product.findById(prodId)
    .then(product => {
      //check if the user is logged in or not
      if(!req.session.user){
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
        req.session.tempCart.addToCart(prodId);
        console.log(req.session.tempCart);
      }
    
    })
    .then(() => {
      //console.log('cart created');
      res.status(200).json({message:'Product added succesfully!',qty:req.session.tempCart.items.length});
      
    })
    .catch(err => {
      //console.log('error',err);
      res.status(500).json({message:'Adding product failed'});
    });
  };
  
  //helper funtions
function getCartProducts (req) { //currently not woring fully
    //helper funtiuon
    //obtain the cart either from user or tempcart
    //parse the cart to Mongoose object
    //let cart =req.session.tempCart
    let cart =Cart.hydrate(req.session.tempCart);
    //get products of cart items
    cart
    .populate('items.productId')
    .execPopulate()
    .then(pcart => {
      //console.log('getCartProducts ,cart',pcart.items);
      return pcart.items;
    });
  
  };
  