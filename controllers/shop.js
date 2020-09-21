const Product = require('../models/product');
const Category = require('../models/category');
const Cart = require('../models/cart');
const User = require('../models/user');
const cart = require('../models/cart');
const { get } = require('mongoose');

const categoriesArr=
["Dress",
"Woman T-shirts",
"Woman Trousers",
"Blouse",
"Woman Shorts",
"Tights",
"Skirt",
"Woman Sweatshirt",
"Overalls",
"Woman Slipper",
"Sandals",
"Heeled shoes",
"Women Sneakers",
"Flat shoes",
"Men T-shirts",
"Men Shirt",
"Men Trousers",
"Shorts",
"Men Sweatshirt",
"Swim Shorts",
"Sports Shoes & Sneakers",
"Men Slipper",
"Classic Shoes",
"Casual Shoes",
"Girl Child",
"Boy",
"Baby Girl",
"Baby boy"];

exports.getProducts =(req, res, next) => {
  //genreal funtion to return products with or without params: limit,page,category
  const categoryId = req.params.categoryId ||categoriesArr;
  console.log('categoryId,',categoryId,typeof(categoryId));
  let page = req.params.page || 1;
  let r_limit = req.params.limit || 9;
  let limit = parseInt(r_limit);

  //get the cart of current user or session to send it to the template //todo



    Product.paginate({ categoryId: categoryId }, { page: page, limit: limit }, function (err, result) {
      res.render('shop/products', {
        products: result.docs,
        total: result.totalDocs,
        limit: result.limit,
        page: page,
        pages: result.totalPages
      });
    }).catch(err => {
      console.log(err);
    })
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



exports.getIndex = (req, res, next) => {
  res.render('shop/index', {
    products: "",
    result: "",
    total: "",
    limit: "",
    page: "",
    pages: ""
  });
};

/*add post and get check out here*/
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'checkout'
  });
};
/*--------------------------------------*/



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

