const Product = require('../models/product');
const Category = require('../models/category');
const Cart = require('../models/cart');
const User = require('../models/user');


const categoriesArr =
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
//         pages: result.totalPages
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
  if (req.session.tempCart) {
    //fetch cart info
    let cart = Cart.hydrate(req.session.tempCart);
    let cartItems;

    cart
      .populate('items.productId')
      .execPopulate()
      .then(pcart => {
        //console.log('getCartProducts ,cart',pcart.items);
        cartItems = pcart.items;
        Product.paginate({ categoryId: categoryId }, { page: page, limit: limit }, function (err, result) {
          res.render('shop/products', {
            products: result.docs,
            total: result.totalDocs,
            limit: result.limit,
            page: page,
            pages: result.totalPages,
            cartProducts: cartItems
          });
        })
      })
      .catch(err => {
        console.log(err)
      });

  } else {
    Product.paginate({ categoryId: categoryId }, { page: page, limit: limit }, function (err, result) {
      res.render('shop/products', {
        products: result.docs,
        total: result.totalDocs,
        limit: result.limit,
        page: page,
        pages: result.totalPages,
        cartProducts: []
      });
    }).catch(err => {
      console.log(err);
    });
  }

};



exports.getProduct = (req, res, next) => {
  //try to obtain cart items bbefore rendering 
  //getCartProducts()
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/single_product', {
        product: product,
        pageTitle: product.title,
        cartProducts: [] //temproary solution ! error
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


exports.getCart = (req, res, next) => {
  let cart = Cart.hydrate(req.session.tempCart);
  let catItems;
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

exports.postCart = (req, res, next) => { };


exports.addToCart = (req, res, next) => {
  //async (due to client side request)
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      //check if the user is logged in or not
      if (!req.session.user) {
        //user is not logged ,thus check if the session has a cart already if not create a new one before adding the product
        if (!req.session.tempCart) {
          //no Cart
          //create a cart
          //console.log('no Cart,create a new one')
          const cart = new Cart();
          req.session.tempCart = cart;
          //console.log(req.session.tempCart,req.session.tempCart.items.length);
        } else {//we already have a cart in our session cast it to document
          req.session.tempCart = Cart.hydrate(req.session.tempCart);
        }
        //add product to cart

        req.session.tempCart.addToCart(prodId);
        console.log(req.session.tempCart);
      }

    })
    .then(() => {
      //console.log('cart created');
      res.status(200).json({ message: 'Product added succesfully!' });

    })
    .catch(err => {
      //console.log('error',err);
      res.status(500).json({ message: 'Adding product failed' });
    });
};

exports.postCart = (req, res, next) => { };



exports.postOrder = (req, res, next) => { };

exports.getOrders = (req, res, next) => { };

//helper funtions
function getCartProducts(req) { //currently not woring fully
  //helper funtiuon
  //obtain the cart either from user or tempcart
  //parse the cart to Mongoose object
  //let cart =req.session.tempCart
  let cart = Cart.hydrate(req.session.tempCart);
  //get products of cart items
  cart
    .populate('items.productId')
    .execPopulate()
    .then(pcart => {
      //console.log('getCartProducts ,cart',pcart.items);
      return pcart.items;
    });

};





/*Refrences codes*/

/*
exports.getProducts = (req, res, next) => {

  console.log('getProducts controller')

  /*Category.find({}).then(result => {
    req.app.locals.Category = result;
  });*/

  // console.log('categorieslv2');
  // console.log(categorieslv2);
  //obtain categories lists lv2,lv3,lv4,

  //Doing pagination
  // Product.paginate({}, {
  //   page: 1, limit: 1, function(err, result) {

  //     res.render('shop/products', {
  //       title: 'All Products',
  //       result: result.docs,
  //       total: result.total,
  //       limit: result.limit,
  //       page: result.page,
  //       pages: result.pages
  //     });
  //   }
  // });

//  Product.find().then(products => {
//   res.render('shop/products', {
//     pageTitle: 'All Products',
//     path: '/products',
//     products: products

//   });
// })
//   .catch(err => {
//     console.log(err)
//   });
// };

//  Product.find({ categoryId: categoryId })
//     .then(products => {
//       res.render('shop/products', {
//         products: products,
//         pageTitle: categoryId,
//         path: '/products/' + categoryId
//       });
//     })

// exports.getPagination = (req, res, next) => {
//   let page = req.params.page || 1;
//   let r_limit = req.params.limit || 2;
//   let limit = parseInt(r_limit);
//   console.log('limit : ', limit)
//   Product.paginate({}, { page: page, limit: limit }, function (err, result) {
//     // console.log('result.docs : ')
//     // console.log(result.docs)

//     // console.log('result.totalDocs : ')
//     // console.log(result.totalDocs)

//     res.render('shop/products', {
//       products: result.docs,
//       // result: result.docs, 
//       total: result.totalDocs,
//       limit: result.limit,
//       page: page,
//       pages: result.totalPages
//     });
//   }).catch(err => {
//     console.log(err);
//   })
// }



