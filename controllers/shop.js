const Product = require('../models/product');
const Category = require('../models/category');

exports.getProductsByCategory = (req, res, next) => {
  const categoryId = req.params.categoryId;
  Product.find({categoryId:categoryId})
    .then(products => {
      res.render('shop/products', {
        products: products,
        pageTitle: product.title,
        path: '/products/'+categoryId
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {


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
