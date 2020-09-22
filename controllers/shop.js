//const Product = require('../models/product');
const Category = require('../models/category');
<<<<<<< Updated upstream

exports.getProducts = (req, res, next) => {
=======
const Cart = require('../models/cart');
const User = require('../models/user');


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

// exports.getProducts =(req, res, next) => {
//   //General funtion to return products with or without params: limit,page,category
//   const categoryId = req.params.categoryId || categoriesArr;
//   let page = req.params.page || 1;
//   let limit = 12;

//     Product.paginate({ categoryId: categoryId }, { page: page, limit: limit }, function (err, result) {
//       res.render('shop/products', {
//         products: result.docs,
//         total: result.totalDocs,
//         limit: result.limit,
//         page: page,
//         pages: result.totalPages,
//         cartProducts: []
//       });
//     }).catch(err => {
//       console.log(err);
//     });


// };

exports.getProducts = (req, res, next) => {
  // console.log('getProducts controller')
  // console.log(getCartProducts(req));
  //General funtion to return products with or without params: limit,page,category
  const categoryId = req.params.categoryId || categoriesArr;
  let page = req.params.page || 1;
  let limit = 12;

  if(req.session.tempCart){
    //fetch cart info
    let cart =Cart.hydrate(req.session.tempCart);
    let cartItems ;
>>>>>>> Stashed changes


<<<<<<< Updated upstream
  /*Category.find({}).then(result => {
    req.app.locals.Category = result;
  });*/
=======
  }else{
    // Product.paginate({ categoryId: categoryId }, { page: page, limit: limit }, function (err, result) {
    //   res.render('shop/products', {
    //     products: result.docs,
    Product.paginate({ categoryId: categoryId }, { page: page, limit: limit }, function (err, result) {
      res.render('shop/products', {
        products: result.docs,
        total: result.totalDocs,
        limit: result.limit,
        page: page,
        pages: result.totalPages,
        cartProducts:cartItems
      });
    }).catch(err => {
      console.log(err);
    });
  }
>>>>>>> Stashed changes


  // console.log('categorieslv2');
  // console.log(categorieslv2);
  //obtain categories lists lv2,lv3,lv4,


  res.render('shop/products', {
    pageTitle: 'All Products',
    path: '/products',
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
