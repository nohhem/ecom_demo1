const Product = require('../models/product');
const Category = require('../models/category');
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


exports.getCart = (req, res, next) => { };

exports.postCart = (req, res, next) => { };

exports.postCartDeleteProduct = (req, res, next) => { };

exports.postOrder = (req, res, next) => { };

exports.getOrders = (req, res, next) => { };








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


