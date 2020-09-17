const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');
const Order = require('../models/order');

exports.test1 = (req, res, next) => {

    /*Category.find({ path: /,Woman,Clothing,/ }).then(result => {
        //console.log(result.);
        result.map(b => {
            console.log(b._id)
        })
    })*/

    // Category.find({ parent: /^\/Shoe/ }).then(result => {
    //     console.log(result);
    // });
    Category.find({ parent: "/Shoe" }).then(result => {
        console.log(result);
    });



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

    // We are adding categories Level 1 to our database :
    /*console.log('categoryyy insertion ')*/
    // Category.insertMany([

    //     // Level 1
    //     { _id: "Fashion", path: null },
    //     // Level 2
    //     { _id: "Woman", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Men", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Shoe bag", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Sports_wear & Shoes", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Outdoor Clothing & Shoes", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Kids & Baby", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Watch", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Sunglasses", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Jewelry & Gems", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Accessories", path: ",Fashion,", parent: "/Fashion" },
    //     // Level 3
    //     { _id: "Woman Clothing", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Beach Wear", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Woman Underwear", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Pyjamas", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Woman Sportswear", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Big size", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Hijab Clothing", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Woman Shoe", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Accessory", path: ",Fashion,Woman,", parent: "/Woman" },

    //     { _id: "Men Clothing", path: ",Fashion,Men,", parent: "/Men" },
    //     { _id: "Men Underwear", path: ",Fashion,Men,", parent: "/Men" },
    //     { _id: "Men Sportswear", path: ",Fashion,Men,", parent: "/Men" },
    //     { _id: "Men Shoe", path: ",Fashion,Men,", parent: "/Men" },

    //     { _id: "Women shoes", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Men shoes", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Sneakers", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Women handbags", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Men's Bag", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Suitcase & Suitcase", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Girls Shoes", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Boys Shoes", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Baby shoes", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },

    //     { _id: "Child", path: ",Fashion,Kids & Baby,", parent: "/Kids & Baby" },
    //     { _id: "Baby", path: ",Fashion,Kids & Baby,", parent: "/Kids & Baby" },

    //     { _id: "Men Watch", path: ",Fashion,Watch", parent: "/Watch" },
    //     { _id: "Woman Watch", path: ",Fashion,Watch", parent: "/Watch" },
    //     { _id: "Unisex Watch", path: ",Fashion,Watch", parent: "/Watch" },
    //     { _id: "Child Watch", path: ",Fashion,Watch", parent: "/Watch" },

    //     { _id: "Men Sunglasses", path: ",Fashion,Sunglasses", parent: "/Sunglasses" },
    //     { _id: "Woman Sunglasses", path: ",Fashion,Sunglasses", parent: "/Sunglasses" },
    //     { _id: "Unisex Sunglasses", path: ",Fashion,Sunglasses", parent: "/Sunglasses" },
    //     { _id: "Child Sunglasses", path: ",Fashion,Sunglasses", parent: "/Sunglasses" },

    //     { _id: "Woman Jewelry & Gems", path: ",Fashion,Jewelry & Gems", parent: "/Jewelry & Gems" },
    //     { _id: "Men Jewelry & Gems", path: ",Fashion,Jewelry & Gems", parent: "/Jewelry & Gems" },
    //     { _id: "Personalized Jewelry", path: ",Fashion,Jewelry & Gems", parent: "/Jewelry & Gems" },
    //     { _id: "Gift Sets", path: ",Fashion,Jewelry & Gems", parent: "/Jewelry & Gems" },

    //     // Level 4

    //     { _id: "Dress", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Woman T-shirts", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Woman Trousers", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Blouse", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Woman Shorts", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Tights", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Skirt", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Woman Sweatshirt", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Overalls", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },

    //     { _id: "Woman Slipper", path: ",Fashion,Woman,Shoe,", parent: "/Woman Shoe" },
    //     { _id: "Sandals", path: ",Fashion,Woman,Shoe,", parent: "/Woman Shoe" },
    //     { _id: "Heeled shoes", path: ",Fashion,Woman,Shoe,", parent: "/Woman Shoe" },
    //     { _id: "Women Sneakers", path: ",Fashion,Woman,Shoe,", parent: "/Woman Shoe" },
    //     { _id: "Flat shoes", path: ",Fashion,Woman,Shoe,", parent: "/Woman Shoe" },

    //     { _id: "Men T-shirts", path: ",Fashion,Men,Clothing,", parent: "/Men Clothing" },
    //     { _id: "Men Shirt", path: ",Fashion,Men,Clothing,", parent: "/Men Clothing" },
    //     { _id: "Men Trousers", path: ",Fashion,Men,Clothing,", parent: "/Men Clothing" },
    //     { _id: "Shorts", path: ",Fashion,Men,Clothing,", parent: "/Men Clothing" },
    //     { _id: "Men Sweatshirt", path: ",Fashion,Men,Clothing,", parent: "/Men Clothing" },
    //     { _id: "Swim Shorts", path: ",Fashion,Men,Clothing,", parent: "/Men Clothing" },
        
    //     { _id: "Sports Shoes & Sneakers", path: ",Fashion,Men,Shoe,", parent: "/Men Shoe" },
    //     { _id: "Men Slipper", path: ",Fashion,Men,Shoe,", parent: "/Men Shoe" },
    //     { _id: "Classic Shoes", path: ",Fashion,Men,Shoe,", parent: "/Men Shoe" },
    //     { _id: "Casual Shoes", path: ",Fashion,Men,Shoe,", parent: "/Men Shoe" },
        
    //     { _id: "Girl Child", path: ",Fashion,Kids & Baby,Child,", parent: "/Child" },
    //     { _id: "Boy", path: ",Fashion,Kids & Baby,Child,", parent: "/Child" },

    //     { _id: "Baby Girl", path: ",Fashion,Kids & Baby,Baby,", parent: "/Baby" },
    //     { _id: "Baby boy", path: ",Fashion,Kids & Baby,Baby,", parent: "/Baby" }

    // ]);

    next();



}