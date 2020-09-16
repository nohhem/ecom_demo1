//const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  res.render('shop/products', {
    pageTitle: 'All Products',
    path: '/products'
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
  res.render('shop/single_product', {
    pageTitle: 'single product'

  });
};

/*add post and get check out here*/
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'checkout'
  });
};
/*--------------------------------------*/


exports.getCart = (req, res, next) => { };

exports.postCart = (req, res, next) => { };

exports.postCartDeleteProduct = (req, res, next) => { };

exports.postOrder = (req, res, next) => { };

exports.getOrders = (req, res, next) => { };
