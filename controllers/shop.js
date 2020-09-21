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

  /*Category.find({}).then(result => {
    req.app.locals.Category = result;
  });*/

  // console.log('categorieslv2');
  // console.log(categorieslv2);
  //obtain categories lists lv2,lv3,lv4,
  Product.find().then(products => {
    res.render('shop/products', {
      pageTitle: 'All Products',
      path: '/products',
      products: products

    });
  })
  .catch(err => {
      console.log(err)
    });

  // Product.findAll()
  //   .then(products => {
  //     res.render('shop/products', {
  //       prods: products,
  //       pageTitle: 'All Products',
  //       path: '/products',
  //       isAuthenticated: req.session.isLoggedIn
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  
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

exports.postCart = (req, res, next) => { };


exports.addToCart = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product => {
    //check if the user is logged in or not
    if(!req.session.user){
      //user is not logged ,thus check if the session has a cart already if not create a new one before adding the product
      if(!req.session.tempCart){
        // create a comment
        //post.comments.push({ title: 'My comment' });
        //creat a cart

        const cart = new Cart();
        
        req.session.tempCart= cart;
        
      }else{//we already have a cart in our session cast it to document
        req.session.tempCart=Cart.hydrate(req.session.tempCart);
      }
      //add product to cart
      console.log(req.session.tempCart);
      req.session.tempCart.addToCart(prodId);
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
