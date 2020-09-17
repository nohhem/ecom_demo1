//const Product = require('../models/product');
const Category = require('../models/category');

exports.getProducts = (req, res, next) => {

  let categorieslv2=[];
  let categories;
  Category.find({}).then(result => {
    //console.log(result.);
    categories =result;
    result.map(b => {
        //console.log(b._id)
        // categorieslv2.push(b._id);
    });
    console.log(categories);
    console.log('------------------');
    console.log(categories.length);
    
  });
  // console.log('categorieslv2');
  // console.log(categorieslv2);
  //obtain categories lists lv2,lv3,lv4,

  res.render('shop/products', {
    pageTitle: 'All Products',
    path: '/products',
    categories: categories
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
