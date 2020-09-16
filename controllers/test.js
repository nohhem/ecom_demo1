const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');
const Order = require('../models/order');

exports.test1 = (req, res, next) => {

    // User.create('Omar alomar ', 'omreal2009@gmail.com', '123456789');
    // const user = new User({
    //     fullname: 'Omar alomar ',
    //     email: 'omreal2009@gmail.com',
    //     password: '123456789'
    //   });
    //   user.save().then(result => {

    //     console.log('Created User');

    //   })
    // const category = new Category({
    //     _id: 'Electronics',
    //     path: null
    // });
    // category.save().then(r => { console.log('category created')});

    //   const product = new Product({
    //       title:'Macbook' ,
    //       price: 1234,
    //       description: 'safasfasfsafsf',
    //       imageUrl: 'sdfsdfsdfdsf',
    //       stockQty: 23 ,
    //       discount: 10,
    //       reviews: [],
    //       categoryId: "Electronics"

    //   })
    //   product.save().then(result => {console.log('Created Product')});
    // const prod2 = Product.findById('5f5e92ec2234ac0c6a604b42')
    // //const prod1 = {"_id":{"oid":"5f5e92ec2234ac0c6a604b42"},"title":"Macbook","price":1234,"description":"safasfasfsafsf","imageUrl":"sdfsdfsdfdsf","stockQty":23,"discount":10,"reviews":[{"_id":{"oid":"5f5e89f5f0730d085344cbe2"},"reviewComment":"i like this product","userRating":3,"avgRate":2.5,"userId":{"oid":"5f5e89f5f0730d085344cbee"}}],"categoryId":"Electronics","__v":0};
    // const order = new Order({
    //           user: {
    //               email: 'omreal2009@hotmail.com',
    //               userId: '5f5e8d6f2eab7745404b55d0'
    //           },
    //           invoice: {
    //               totalAmount: 55*22,
    //               items:[{
    //                 product: prod2,
    //                 qty: 55,
    //                 productPrice: 71
    //             }] 
    //           }

    //       })
    //       order.save().then(result => {console.log('Created Order')});

    //   console.log('weeelcome ');
    Category.insertMany([
        { _id: "Fashion", path: null },
        { _id: "Woman", path: ",fashion," },
        { _id: "Men", path: ",fashion," },
        { _id: "Shoe Bag", path: ",fashion," },
        { _id: "ShoeBag", path: ",fashion," },
        { _id: "Sports Wear & Shoes", path: ",fashion," },
        { _id: "Outdoor Clothing & Shoes", path: ",fashion," },
        { _id: "Kids & Baby", path: ",fashion," },
        { _id: "Watch", path: ",fashion," },
        { _id: "Sunglasses", path: ",fashion," },
        { _id: "Jewelry & Gems", path: ",fashion," },
        { _id: "Accessories", path: ",fashion," }
    ])
    next();



}