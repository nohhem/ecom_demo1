const Product = require('../models/product');
const Category = require('../models/category');
const Cart = require('../models/cart');
const User = require('../models/user');
const cart = require('../models/cart');

exports.testController = (req,res,next) => {
  console.log('testController');
};

exports.getProductsByCategory = (req, res, next) => {
  // console.log('getProductsByCategory');
  const categoryId = req.params.categoryId;
  Product.find({categoryId:categoryId})
    .then(products => {
      res.render('shop/products', {
        products: products,
        pageTitle: categoryId,
        path: '/products/'+categoryId
      });
    })
};

exports.getProducts = (req, res, next) => {
  // console.log('getProducts controller')
  // console.log(getCartProducts(req));
  
  if(req.session.tempCart){
    let cart =Cart.hydrate(req.session.tempCart);
    let cartItems ;
    cart
    .populate('items.productId')
    .execPopulate()
    .then(pcart => {
      //console.log('getCartProducts ,cart',pcart.items);
      cartItems= pcart.items;
    })
    .then(()=>{
      return Product.find().limit(20);
    }).then(products => {
      res.render('shop/products', {
        pageTitle: 'All Products',
        path: '/products',
        products: products,
        cartProducts:cartItems
      });
    }).catch(err => {
      console.log(err)
    });
    
  }else{
    Product.find().limit(20)
    .then(products => {
      res.render('shop/products', {
        pageTitle: 'All Products',
        path: '/products',
        products: products,
        cartProducts:[]
      });
    })
    .catch(err => {
        console.log(err)
      });
  }

  
};

exports.getIndex = (req, res, next) => {
};
exports.getProduct = (req, res, next) => {

  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/single_product', {
        product: product,
        pageTitle: product.title
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

/*add post and get check out here*/
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'checkout'
  });
};
/*--------------------------------------*/

exports.getCart = (req, res, next) => {
  let cart =Cart.hydrate(req.session.tempCart);
  let catItems ;
  cart
  .populate('items.productId')
  .execPopulate()
  .then(pcart => {
    //console.log('getCartProducts ,cart',pcart.items);
    catItems= pcart.items;
  }).then(()=>{
    res.render('shop/viewCart', {
      pageTitle: 'Cart',
      cartProducts:catItems
    });
  })
  
};

exports.postCart = (req, res, next) => { };


exports.addToCart = (req, res, next) => {
  const prodId = req.params.productId;
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
    res.status(200).json({message:'Product added succesfully!'});
    
  })
  .catch(err => {
    //console.log('error',err);
    res.status(500).json({message:'Adding product failed'});
  });
};

exports.postCart = (req, res, next) => { };

exports.postCartDeleteProduct = (req, res, next) => { };

exports.postOrder = (req, res, next) => { };

exports.getOrders = (req, res, next) => { };

function getCartProducts (req) {
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