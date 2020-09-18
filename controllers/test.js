const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');
const Order = require('../models/order');

const mongoose = require('mongoose');
const dummy = require('mongoose-dummy');

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
    // Category.find({ parent: "/Shoe" }).then(result => {
    //     console.log(result);
    // });



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
    //     { _id: "Fashion" , category_title: "Fashion", path: null },
    //     // Level 2
    //     { _id: "Woman", category_title: "Woman", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Men", category_title: "Men", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Shoe bag", category_title: "Shoe bag", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Kids & Baby", category_title: "Kids & Baby", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Watch", category_title: "Watch", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Sunglasses", category_title: "Sunglasses", path: ",Fashion,", parent: "/Fashion" },
    //     { _id: "Jewelry & Gems", category_title: "Jewelry & Gems", path: ",Fashion,", parent: "/Fashion" },
    //     // Level 3
    //     { _id: "Woman Clothing", category_title: "Woman Clothing", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Beach Wear", category_title: "Beach Wear", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Woman Underwear", category_title: "Woman Underwear", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Pyjamas", category_title: "Pyjamas", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Woman Sportswear", category_title: "Woman Sportswear", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Big size", category_title: "Big size", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Hijab Clothing", category_title: "Hijab Clothing", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Woman Shoe", category_title: "Woman Shoe", path: ",Fashion,Woman,", parent: "/Woman" },
    //     { _id: "Accessory", category_title: "Accessory", path: ",Fashion,Woman,", parent: "/Woman" },

    //     { _id: "Men Clothing", category_title: "Men Clothing", path: ",Fashion,Men,", parent: "/Men" },
    //     { _id: "Men Underwear", category_title: "Men Underwear", path: ",Fashion,Men,", parent: "/Men" },
    //     { _id: "Men Sportswear", category_title: "Men Sportswear", path: ",Fashion,Men,", parent: "/Men" },
    //     { _id: "Men Shoe", category_title: "Men Shoe", path: ",Fashion,Men,", parent: "/Men" },

    //     { _id: "Women shoes", category_title: "Women shoes", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Men shoes", category_title: "Men shoes", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Sneakers", category_title: "Sneakers", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Women handbags", category_title: "Women handbags", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Men's Bag", category_title: "Men's Bag", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Suitcase & Suitcase", category_title: "Suitcase & Suitcase", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Girls Shoes", category_title: "Girls Shoes", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Boys Shoes", category_title: "Boys Shoes", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },
    //     { _id: "Baby shoes", category_title: "Baby shoes", path: ",Fashion,Shoe bag,", parent: "/Shoe bag" },

    //     { _id: "Child", category_title: "Child", path: ",Fashion,Kids & Baby,", parent: "/Kids & Baby" },
    //     { _id: "Baby", category_title: "Baby", path: ",Fashion,Kids & Baby,", parent: "/Kids & Baby" },

    //     { _id: "Men Watch", category_title: "Men Watch", path: ",Fashion,Watch", parent: "/Watch" },
    //     { _id: "Woman Watch", category_title: "Woman Watch", path: ",Fashion,Watch", parent: "/Watch" },
    //     { _id: "Unisex Watch", category_title: "Unisex Watch", path: ",Fashion,Watch", parent: "/Watch" },
    //     { _id: "Child Watch", category_title: "Child Watch", path: ",Fashion,Watch", parent: "/Watch" },

    //     { _id: "Men Sunglasses", category_title: "Men Sunglasses", path: ",Fashion,Sunglasses", parent: "/Sunglasses" },
    //     { _id: "Woman Sunglasses", category_title: "Woman Sunglasses", path: ",Fashion,Sunglasses", parent: "/Sunglasses" },
    //     { _id: "Unisex Sunglasses", category_title: "Unisex Sunglasses", path: ",Fashion,Sunglasses", parent: "/Sunglasses" },
    //     { _id: "Child Sunglasses", category_title: "Child Sunglasses", path: ",Fashion,Sunglasses", parent: "/Sunglasses" },

    //     { _id: "Woman Jewelry & Gems", category_title: "Woman Jewelry & Gems", path: ",Fashion,Jewelry & Gems", parent: "/Jewelry & Gems" },
    //     { _id: "Men Jewelry & Gems", category_title: "Men Jewelry & Gems", path: ",Fashion,Jewelry & Gems", parent: "/Jewelry & Gems" },
    //     { _id: "Personalized Jewelry", category_title: "Personalized Jewelry", path: ",Fashion,Jewelry & Gems", parent: "/Jewelry & Gems" },
    //     { _id: "Gift Sets", category_title: "Gift Sets", path: ",Fashion,Jewelry & Gems", parent: "/Jewelry & Gems" },

    //     // Level 4

    //     { _id: "Dress", category_title: "Dress", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Woman T-shirts", category_title: "Woman T-shirts", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Woman Trousers", category_title: "Woman Trousers", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Blouse", category_title: "Blouse", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Woman Shorts", category_title: "Woman Shorts", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Tights", category_title: "Tights", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Skirt", category_title: "Skirt", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Woman Sweatshirt", category_title: "Woman Sweatshirt", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },
    //     { _id: "Overalls", category_title: "Overalls", path: ",Fashion,Woman,Clothing,", parent: "/Woman Clothing" },

    //     { _id: "Woman Slipper", category_title: "Woman Slipper", path: ",Fashion,Woman,Shoe,", parent: "/Woman Shoe" },
    //     { _id: "Sandals", category_title: "Sandals", path: ",Fashion,Woman,Shoe,", parent: "/Woman Shoe" },
    //     { _id: "Heeled shoes", category_title: "Heeled shoes", path: ",Fashion,Woman,Shoe,", parent: "/Woman Shoe" },
    //     { _id: "Women Sneakers", category_title: "Women Sneakers", path: ",Fashion,Woman,Shoe,", parent: "/Woman Shoe" },
    //     { _id: "Flat shoes", category_title: "Flat shoes", path: ",Fashion,Woman,Shoe,", parent: "/Woman Shoe" },

    //     { _id: "Men T-shirts", category_title: "Men T-shirts", path: ",Fashion,Men,Clothing,", parent: "/Men Clothing" },
    //     { _id: "Men Shirt", category_title: "Men Shirt", path: ",Fashion,Men,Clothing,", parent: "/Men Clothing" },
    //     { _id: "Men Trousers", category_title: "Men Trousers", path: ",Fashion,Men,Clothing,", parent: "/Men Clothing" },
    //     { _id: "Shorts", category_title: "Shorts", path: ",Fashion,Men,Clothing,", parent: "/Men Clothing" },
    //     { _id: "Men Sweatshirt", category_title: "Men Sweatshirt", path: ",Fashion,Men,Clothing,", parent: "/Men Clothing" },
    //     { _id: "Swim Shorts", category_title: "Swim Shorts", path: ",Fashion,Men,Clothing,", parent: "/Men Clothing" },
        
    //     { _id: "Sports Shoes & Sneakers", category_title: "Sports Shoes & Sneakers", path: ",Fashion,Men,Shoe,", parent: "/Men Shoe" },
    //     { _id: "Men Slipper", category_title: "Men Slipper", path: ",Fashion,Men,Shoe,", parent: "/Men Shoe" },
    //     { _id: "Classic Shoes", category_title: "Classic Shoes", path: ",Fashion,Men,Shoe,", parent: "/Men Shoe" },
    //     { _id: "Casual Shoes", category_title: "Casual Shoes", path: ",Fashion,Men,Shoe,", parent: "/Men Shoe" },
        
    //     { _id: "Girl Child", category_title: "Girl Child", path: ",Fashion,Kids & Baby,Child,", parent: "/Child" },
    //     { _id: "Boy", category_title: "Boy", path: ",Fashion,Kids & Baby,Child,", parent: "/Child" },

    //     { _id: "Baby Girl", category_title: "Baby Girl", path: ",Fashion,Kids & Baby,Baby,", parent: "/Baby" },
    //     { _id: "Baby boy", category_title: "Baby boy", path: ",Fashion,Kids & Baby,Baby,", parent: "/Baby" }

    // ]);





    // <!-- <% console.log( categorylv4.parent ,"===" +  categorylv3._id,categorylv4.parent == "/" +  categorylv3._id) %> -->
    next();



}

exports.test2mockDataGeneration = (req,res,next) => {
        // const mongoose = require('mongoose');
        // const dummy = require('mongoose-dummy');
    const ignoredFields = ['_id','created_at', '__v','reviews'];
    // let genderValues = ['Male', 'Female']

    let schemaDefinition = new mongoose.Schema(Product);

    let model = mongoose.model('Product', schemaDefinition);
    let randomObject = dummy(model, {
        ignore: ignoredFields,
        custom: {
            title: [String],
            price: [Number],
            imageUrl: [String],
            stockQty: [Number],
            discount: [Number],
            categoryId: [String]
        }
      });

    console.log(randomObject);
    }