const Product = require('../models/product');

exports.getProducts = (req, res, next) => {};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/products', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getProduct = (req, res, next) => {};

exports.getCart = (req, res, next) => {};

exports.postCart = (req, res, next) => {};

exports.postCartDeleteProduct = (req, res, next) => {};

exports.postOrder = (req, res, next) => {};

exports.getOrders = (req, res, next) => {};
