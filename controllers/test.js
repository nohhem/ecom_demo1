const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');
const Order = require('../models/order');

const mongoose = require('mongoose');
const dummy = require('mongoose-dummy');
const category = require('../models/category');

exports.test0 = async (req,res,next) => {
    req.session.user.fullname = 'nohtest4';
    req.session.testdata='testdata3';
    req.session.testtt= 'testdata3';
    //await req.session.save();
    console.log(req.session.user.fullname,req.session.testdata);
    res.status(200).json({message:'success',data:req.session});
    //return res.redirect('/');
};

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

// exports.test2mockDataGeneration = (req,res,next) => {



//     try {
//     // product_list[0].categoryId=ourCategories[0];
//     // console.log(product_list[0]);
//     // for(let i=0;i<product_list.length;i++){
//     //     let min=0;
//     //     let max= ourCategories.length-1;
//     //     randomN=min + Math.floor(Math.random() * (max - min + 1));
//     //     console.log(ourCategories.length,randomN,ourCategories[randomN])
//     //     //
//     //     product_list[i].categoryId=ourCategories[randomN];
//     // };
//     //console.log(-----------------------);
//     Product.insertMany(product_list);
//     } catch (error) {
//       console.log(error)  
//     }
//     next();
    

// }
//    const ourCategories=
//     ["Dress",
//     "Woman T-shirts",
//     "Woman Trousers",
//     "Blouse",
//     "Woman Shorts",
//     "Tights",
//     "Skirt",
//     "Woman Sweatshirt",
//     "Overalls",

//     "Woman Slipper",
//     "Sandals",
//     "Heeled shoes",
//     "Women Sneakers",
//     "Flat shoes",

//     "Men T-shirts",
//     "Men Shirt",
//     "Men Trousers",
//     "Shorts",
//     "Men Sweatshirt",
//     "Swim Shorts",

//     "Sports Shoes & Sneakers",
//     "Men Slipper",
//     "Classic Shoes",
//     "Casual Shoes",
//     "Girl Child",
//     "Boy",
//     "Baby Girl",
//     "Baby boy"]

//     let product_list=
//     [{"title":"METFORMIN HYDROCHLORIDE","price":96.47,"description":"nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis","imageUrl":"http://dummyimage.com/173x196.jpg/5fa2dd/ffffff","stockQty":92,"discount":10,"categoryId":"Skirt"},
// {"title":"fibrinogen human and thrombin human","price":61.61,"description":"massa donec dapibus duis at velit eu est congue elementum in hac","imageUrl":"http://dummyimage.com/181x122.jpg/5fa2dd/ffffff","stockQty":41,"discount":20,"categoryId":"Baby Girl"},
// {"title":"Magnesium hydroxide","price":40.89,"description":"in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam","imageUrl":"http://dummyimage.com/157x193.jpg/5fa2dd/ffffff","stockQty":28,"discount":18,"categoryId":"Shorts"},
// {"title":"Hydrocodone Bitartrate and Acetaminophen","price":42.59,"description":"aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque","imageUrl":"http://dummyimage.com/108x152.jpg/ff4444/ffffff","stockQty":99,"discount":25,"categoryId":"Tights"},
// {"title":"PSEUDOEPHEDRINE HYDROCHLORIDE, GUAIFENESIN, and DEXTROMETHORPHAN HYDROBROMIDE","price":38.12,"description":"ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur","imageUrl":"http://dummyimage.com/165x214.jpg/5fa2dd/ffffff","stockQty":50,"discount":24,"categoryId":"Classic Shoes"},
// {"title":"Lisinopril","price":52.24,"description":"turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at","imageUrl":"http://dummyimage.com/238x170.jpg/5fa2dd/ffffff","stockQty":40,"discount":3,"categoryId":"Baby Girl"},
// {"title":"Glycerin","price":65.84,"description":"lorem ipsum dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut","imageUrl":"http://dummyimage.com/151x108.jpg/5fa2dd/ffffff","stockQty":70,"discount":10,"categoryId":"Men Shirt"},
// {"title":"Lorazepam","price":39.51,"description":"dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis","imageUrl":"http://dummyimage.com/181x225.jpg/cc0000/ffffff","stockQty":37,"discount":16,"categoryId":"Baby boy"},
// {"title":"Ciprofloxacin","price":97.81,"description":"neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse","imageUrl":"http://dummyimage.com/230x243.jpg/ff4444/ffffff","stockQty":65,"discount":24,"categoryId":"Men Shirt"},
// {"title":"Simethicone","price":74.95,"description":"interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at","imageUrl":"http://dummyimage.com/179x173.jpg/cc0000/ffffff","stockQty":78,"discount":4,"categoryId":"Men Sweatshirt"},
// {"title":"Oxygen","price":92.86,"description":"curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et","imageUrl":"http://dummyimage.com/107x236.jpg/dddddd/000000","stockQty":51,"discount":9,"categoryId":"Woman Sweatshirt"},
// {"title":"Simvastatin","price":1.78,"description":"curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend","imageUrl":"http://dummyimage.com/193x189.jpg/cc0000/ffffff","stockQty":34,"discount":1,"categoryId":"Men Sweatshirt"},
// {"title":"Promethazine Hydrochloride","price":56.23,"description":"pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit","imageUrl":"http://dummyimage.com/243x247.jpg/dddddd/000000","stockQty":8,"discount":4,"categoryId":"Skirt"},
// {"title":"Zinc Oxide","price":38.94,"description":"aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis","imageUrl":"http://dummyimage.com/121x110.jpg/cc0000/ffffff","stockQty":11,"discount":15,"categoryId":"Dress"},
// {"title":"Carbinoxamine Maleate","price":58.85,"description":"morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum","imageUrl":"http://dummyimage.com/242x136.jpg/5fa2dd/ffffff","stockQty":63,"discount":25,"categoryId":"Woman Sweatshirt"},
// {"title":"Desipramine Hydrochloride","price":98.22,"description":"eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis","imageUrl":"http://dummyimage.com/245x184.jpg/dddddd/000000","stockQty":63,"discount":6,"categoryId":"Men T-shirts"},
// {"title":"Carob","price":41.92,"description":"ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna","imageUrl":"http://dummyimage.com/165x208.jpg/ff4444/ffffff","stockQty":39,"discount":24,"categoryId":"Woman Sweatshirt"},
// {"title":"TITANIUM DIOXIDE","price":87.4,"description":"orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut","imageUrl":"http://dummyimage.com/137x236.jpg/5fa2dd/ffffff","stockQty":5,"discount":4,"categoryId":"Blouse"},
// {"title":"Hydrochlorothiazide","price":44.2,"description":"hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem","imageUrl":"http://dummyimage.com/239x139.jpg/ff4444/ffffff","stockQty":58,"discount":23,"categoryId":"Swim Shorts"},
// {"title":"Tacrolimus","price":61.71,"description":"massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas","imageUrl":"http://dummyimage.com/180x173.jpg/cc0000/ffffff","stockQty":56,"discount":19,"categoryId":"Baby Girl"},
// {"title":"Acetaminophen","price":10.97,"description":"eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut","imageUrl":"http://dummyimage.com/173x113.jpg/ff4444/ffffff","stockQty":3,"discount":15,"categoryId":"Boy"},
// {"title":"warfarin sodium","price":64.92,"description":"in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus","imageUrl":"http://dummyimage.com/197x186.jpg/5fa2dd/ffffff","stockQty":27,"discount":14,"categoryId":"Boy"},
// {"title":"Bumetanide","price":53.32,"description":"et commodo vulputate justo in blandit ultrices enim lorem ipsum","imageUrl":"http://dummyimage.com/125x155.jpg/dddddd/000000","stockQty":35,"discount":17,"categoryId":"Men Sweatshirt"},
// {"title":"Naproxen","price":26.22,"description":"neque duis bibendum morbi non quam nec dui luctus rutrum","imageUrl":"http://dummyimage.com/211x188.jpg/5fa2dd/ffffff","stockQty":21,"discount":3,"categoryId":"Heeled shoes"},
// {"title":"OTC Skin Protectant Drug Products","price":44.22,"description":"luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum","imageUrl":"http://dummyimage.com/216x218.jpg/5fa2dd/ffffff","stockQty":61,"discount":9,"categoryId":"Woman Slipper"},
// {"title":"PRAVASTATIN SODIUM","price":47.43,"description":"odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac","imageUrl":"http://dummyimage.com/188x108.jpg/ff4444/ffffff","stockQty":3,"discount":13,"categoryId":"Men Sweatshirt"},
// {"title":"tolterodine tartrate","price":30.7,"description":"tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc","imageUrl":"http://dummyimage.com/205x108.jpg/5fa2dd/ffffff","stockQty":29,"discount":4,"categoryId":"Casual Shoes"},
// {"title":"Aspirin","price":22.5,"description":"mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor","imageUrl":"http://dummyimage.com/141x234.jpg/dddddd/000000","stockQty":87,"discount":10,"categoryId":"Heeled shoes"},
// {"title":"Methylergonovine Maleate","price":84.48,"description":"neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum","imageUrl":"http://dummyimage.com/150x125.jpg/dddddd/000000","stockQty":9,"discount":16,"categoryId":"Flat shoes"},
// {"title":"STRYCHNOS NUX-VOMICA SEED and TOXICODENDRON PUBESCENS LEAF and LITHIUM CARBONATE and COLCHICUM AUTUMNALE BULB and SODIUM CARBONATE and FERROSOFERRIC PHOSPHATE","price":6.18,"description":"mi sit amet lobortis sapien sapien non mi integer ac","imageUrl":"http://dummyimage.com/246x129.jpg/cc0000/ffffff","stockQty":9,"discount":13,"categoryId":"Overalls"},
// {"title":"Acetaminophen","price":68.53,"description":"scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas","imageUrl":"http://dummyimage.com/213x183.jpg/cc0000/ffffff","stockQty":27,"discount":11,"categoryId":"Heeled shoes"},
// {"title":"Esmolol Hydrochloride","price":94.7,"description":"et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor","imageUrl":"http://dummyimage.com/157x180.jpg/dddddd/000000","stockQty":35,"discount":23,"categoryId":"Shorts"},
// {"title":"Desloratadine","price":32.23,"description":"sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam","imageUrl":"http://dummyimage.com/225x212.jpg/cc0000/ffffff","stockQty":66,"discount":15,"categoryId":"Baby boy"},
// {"title":"Ofloxacin","price":18.5,"description":"congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna","imageUrl":"http://dummyimage.com/104x129.jpg/5fa2dd/ffffff","stockQty":51,"discount":22,"categoryId":"Overalls"},
// {"title":"Doxycycline Hyclate","price":38.18,"description":"pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus","imageUrl":"http://dummyimage.com/167x104.jpg/dddddd/000000","stockQty":97,"discount":15,"categoryId":"Sandals"},
// {"title":"ATAZANAVIR SULFATE","price":1.94,"description":"blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer","imageUrl":"http://dummyimage.com/114x194.jpg/5fa2dd/ffffff","stockQty":58,"discount":17,"categoryId":"Tights"},
// {"title":"perphenazine","price":86.13,"description":"amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus","imageUrl":"http://dummyimage.com/168x176.jpg/ff4444/ffffff","stockQty":44,"discount":18,"categoryId":"Flat shoes"},
// {"title":"Amlodipine Besylate","price":59.19,"description":"semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus","imageUrl":"http://dummyimage.com/217x218.jpg/5fa2dd/ffffff","stockQty":2,"discount":22,"categoryId":"Woman Sweatshirt"},
// {"title":"Acetaminophen, Phenylephrine HCl and Dextromethorphan HBr","price":68.48,"description":"luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh","imageUrl":"http://dummyimage.com/115x219.jpg/5fa2dd/ffffff","stockQty":100,"discount":6,"categoryId":"Boy"},
// {"title":"nystatin","price":95.69,"description":"quisque ut erat curabitur gravida nisi at nibh in hac habitasse","imageUrl":"http://dummyimage.com/154x230.jpg/dddddd/000000","stockQty":36,"discount":17,"categoryId":"Men Trousers"},
// {"title":"Methylphenidate Hydrochloride","price":31.08,"description":"quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique tortor eu pede","imageUrl":"http://dummyimage.com/161x213.jpg/5fa2dd/ffffff","stockQty":34,"discount":15,"categoryId":"Overalls"},
// {"title":"Torsemide","price":68.94,"description":"at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat","imageUrl":"http://dummyimage.com/112x173.jpg/ff4444/ffffff","stockQty":12,"discount":6,"categoryId":"Woman Shorts"},
// {"title":"ALCOHOL","price":97.39,"description":"mauris vulputate elementum nullam varius nulla facilisi cras non velit nec","imageUrl":"http://dummyimage.com/138x144.jpg/dddddd/000000","stockQty":64,"discount":4,"categoryId":"Heeled shoes"},
// {"title":"PHENOBARBITAL, HYOSCYAMINE SULFATE, ATROPINE SULFATE, SCOPOLAMINE HYDROBROMIDE","price":23.99,"description":"sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis","imageUrl":"http://dummyimage.com/201x119.jpg/ff4444/ffffff","stockQty":87,"discount":6,"categoryId":"Blouse"},
// {"title":"Ibuprofen","price":50.62,"description":"ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet","imageUrl":"http://dummyimage.com/213x132.jpg/dddddd/000000","stockQty":3,"discount":16,"categoryId":"Skirt"},
// {"title":"Acetaminophen, Chlorpheniramine Maleate, Dextromethorphan Hydrobromide, Phenylephrine Hydrochloride","price":57.24,"description":"a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis","imageUrl":"http://dummyimage.com/113x215.jpg/dddddd/000000","stockQty":7,"discount":12,"categoryId":"Women Sneakers"},
// {"title":"fentanyl","price":39.05,"description":"laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue","imageUrl":"http://dummyimage.com/139x249.jpg/cc0000/ffffff","stockQty":42,"discount":10,"categoryId":"Men T-shirts"},
// {"title":"Ciprofloxacin","price":84.76,"description":"feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac","imageUrl":"http://dummyimage.com/155x247.jpg/ff4444/ffffff","stockQty":31,"discount":14,"categoryId":"Woman Sweatshirt"},
// {"title":"Lamotrigine","price":8.6,"description":"et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris","imageUrl":"http://dummyimage.com/122x241.jpg/cc0000/ffffff","stockQty":80,"discount":8,"categoryId":"Men T-shirts"},
// {"title":"HUMAN C1-ESTERASE INHIBITOR","price":63.85,"description":"in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis","imageUrl":"http://dummyimage.com/116x110.jpg/ff4444/ffffff","stockQty":8,"discount":1,"categoryId":"Men Trousers"},
// {"title":"Glyburide","price":92.4,"description":"in est risus auctor sed tristique in tempus sit amet sem fusce consequat","imageUrl":"http://dummyimage.com/178x228.jpg/5fa2dd/ffffff","stockQty":31,"discount":21,"categoryId":"Men Slipper"},
// {"title":"Diphenhydramine HCl","price":51.47,"description":"ligula nec sem duis aliquam convallis nunc proin at turpis","imageUrl":"http://dummyimage.com/113x173.jpg/cc0000/ffffff","stockQty":13,"discount":17,"categoryId":"Men Shirt"},
// {"title":"Loratadine","price":59.54,"description":"maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio","imageUrl":"http://dummyimage.com/233x176.jpg/cc0000/ffffff","stockQty":94,"discount":12,"categoryId":"Men Sweatshirt"},
// {"title":"Clotrimazole","price":87.91,"description":"curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam","imageUrl":"http://dummyimage.com/250x197.jpg/cc0000/ffffff","stockQty":50,"discount":20,"categoryId":"Men Slipper"},
// {"title":"TETRAKIS(2-METHOXYISOBUTYLISOCYANIDE)COPPER(I) TETRAFLUOROBORATE","price":35.83,"description":"tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum","imageUrl":"http://dummyimage.com/165x248.jpg/cc0000/ffffff","stockQty":65,"discount":18,"categoryId":"Sandals"},
// {"title":"Naproxen","price":80.85,"description":"felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa","imageUrl":"http://dummyimage.com/133x131.jpg/ff4444/ffffff","stockQty":18,"discount":3,"categoryId":"Heeled shoes"},
// {"title":"Methyldopa","price":82.69,"description":"phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim","imageUrl":"http://dummyimage.com/186x203.jpg/ff4444/ffffff","stockQty":30,"discount":24,"categoryId":"Baby Girl"},
// {"title":"Benzalkonium Chloride and Lidocaine Hydrochloride","price":29.81,"description":"interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam","imageUrl":"http://dummyimage.com/193x200.jpg/5fa2dd/ffffff","stockQty":89,"discount":7,"categoryId":"Dress"},
// {"title":"Terazosin Hydrochloride Anhydrous","price":51.85,"description":"cras in purus eu magna vulputate luctus cum sociis natoque penatibus et","imageUrl":"http://dummyimage.com/166x222.jpg/dddddd/000000","stockQty":96,"discount":22,"categoryId":"Woman T-shirts"},
// {"title":"Amlodipine besylate and Atorvastatin calcium","price":70.8,"description":"pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus","imageUrl":"http://dummyimage.com/147x137.jpg/ff4444/ffffff","stockQty":9,"discount":13,"categoryId":"Heeled shoes"},
// {"title":"ZINC OXIDE","price":42.0,"description":"habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat","imageUrl":"http://dummyimage.com/181x162.jpg/5fa2dd/ffffff","stockQty":87,"discount":24,"categoryId":"Woman T-shirts"},
// {"title":"Benzalkonium Chloride","price":36.45,"description":"orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat","imageUrl":"http://dummyimage.com/226x226.jpg/5fa2dd/ffffff","stockQty":60,"discount":15,"categoryId":"Casual Shoes"},
// {"title":"Aconitium napellus, Belladonna, Echinacea angustifolia, Eupatorium perfoliatum, Gelsemium sempervirens, Ferrum phosphoricum, Influenzinum","price":34.47,"description":"ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio","imageUrl":"http://dummyimage.com/193x109.jpg/cc0000/ffffff","stockQty":21,"discount":23,"categoryId":"Blouse"},
// {"title":"Neomycin, Polymyxin B Sulfates and Hydrocortisone","price":29.14,"description":"quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea","imageUrl":"http://dummyimage.com/144x183.jpg/dddddd/000000","stockQty":38,"discount":4,"categoryId":"Swim Shorts"},
// {"title":"carbidopa, levodopa and entacapone","price":84.05,"description":"mi in porttitor pede justo eu massa donec dapibus duis at velit eu","imageUrl":"http://dummyimage.com/139x189.jpg/5fa2dd/ffffff","stockQty":9,"discount":10,"categoryId":"Baby Girl"},
// {"title":"pancrelipase","price":78.96,"description":"suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at","imageUrl":"http://dummyimage.com/209x185.jpg/cc0000/ffffff","stockQty":4,"discount":7,"categoryId":"Swim Shorts"},
// {"title":"NITROGEN","price":74.69,"description":"bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa","imageUrl":"http://dummyimage.com/235x168.jpg/ff4444/ffffff","stockQty":53,"discount":18,"categoryId":"Sports Shoes & Sneakers"},
// {"title":"Sodium Fluoride","price":19.16,"description":"auctor sed tristique in tempus sit amet sem fusce consequat","imageUrl":"http://dummyimage.com/148x215.jpg/dddddd/000000","stockQty":66,"discount":8,"categoryId":"Men Slipper"},
// {"title":"Povidone-Iodine","price":73.47,"description":"sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui","imageUrl":"http://dummyimage.com/105x157.jpg/dddddd/000000","stockQty":55,"discount":21,"categoryId":"Boy"},
// {"title":"ALCOHOL","price":83.4,"description":"ut mauris eget massa tempor convallis nulla neque libero convallis","imageUrl":"http://dummyimage.com/150x240.jpg/ff4444/ffffff","stockQty":53,"discount":9,"categoryId":"Baby boy"},
// {"title":"tolnaftate","price":85.53,"description":"porttitor pede justo eu massa donec dapibus duis at velit","imageUrl":"http://dummyimage.com/146x102.jpg/cc0000/ffffff","stockQty":26,"discount":9,"categoryId":"Girl Child"},
// {"title":"diltiazem hydrochloride","price":82.75,"description":"vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id","imageUrl":"http://dummyimage.com/236x110.jpg/5fa2dd/ffffff","stockQty":27,"discount":7,"categoryId":"Boy"},
// {"title":"ETHYL ALCOHOL","price":4.45,"description":"id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et","imageUrl":"http://dummyimage.com/200x225.jpg/dddddd/000000","stockQty":33,"discount":9,"categoryId":"Baby boy"},
// {"title":"Caffeine","price":95.76,"description":"pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet","imageUrl":"http://dummyimage.com/239x193.jpg/5fa2dd/ffffff","stockQty":44,"discount":1,"categoryId":"Skirt"},
// {"title":"OCTINOXATE","price":22.96,"description":"in felis donec semper sapien a libero nam dui proin leo odio","imageUrl":"http://dummyimage.com/160x168.jpg/5fa2dd/ffffff","stockQty":36,"discount":19,"categoryId":"Overalls"},
// {"title":"Dog Fennel, Eastern Eupatorium capillifolium","price":6.56,"description":"in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus","imageUrl":"http://dummyimage.com/235x228.jpg/dddddd/000000","stockQty":40,"discount":4,"categoryId":"Classic Shoes"},
// {"title":"AVOBENZONE, OCTISALATE, OCTOCRYLENE","price":81.57,"description":"vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur","imageUrl":"http://dummyimage.com/229x141.jpg/dddddd/000000","stockQty":84,"discount":4,"categoryId":"Men T-shirts"},
// {"title":"phenylephrine hcl, brompheniramine maleate","price":7.68,"description":"justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi","imageUrl":"http://dummyimage.com/129x240.jpg/5fa2dd/ffffff","stockQty":65,"discount":21,"categoryId":"Swim Shorts"},
// {"title":"Benzalkonium chloride","price":30.73,"description":"ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae","imageUrl":"http://dummyimage.com/201x181.jpg/5fa2dd/ffffff","stockQty":89,"discount":6,"categoryId":"Swim Shorts"},
// {"title":"Borago Nicotiana","price":48.36,"description":"metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum","imageUrl":"http://dummyimage.com/159x146.jpg/cc0000/ffffff","stockQty":83,"discount":5,"categoryId":"Woman Sweatshirt"},
// {"title":"Ibuprofen","price":98.69,"description":"sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus","imageUrl":"http://dummyimage.com/223x119.jpg/5fa2dd/ffffff","stockQty":86,"discount":19,"categoryId":"Swim Shorts"},
// {"title":"Divalproex sodium","price":85.64,"description":"hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula","imageUrl":"http://dummyimage.com/111x152.jpg/dddddd/000000","stockQty":77,"discount":16,"categoryId":"Men Slipper"},
// {"title":"BETAMETHASONE VALERATE","price":86.22,"description":"erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam","imageUrl":"http://dummyimage.com/115x118.jpg/5fa2dd/ffffff","stockQty":59,"discount":20,"categoryId":"Baby Girl"},
// {"title":"OCTISALATE, AVOBENZONE, and OCTOCRYLENE","price":76.9,"description":"fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu","imageUrl":"http://dummyimage.com/156x232.jpg/ff4444/ffffff","stockQty":43,"discount":12,"categoryId":"Women Sneakers"},
// {"title":"methylphenidate hydrochloride","price":71.22,"description":"consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam","imageUrl":"http://dummyimage.com/143x137.jpg/ff4444/ffffff","stockQty":23,"discount":5,"categoryId":"Skirt"},
// {"title":"Russian Thistle","price":38.52,"description":"sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum","imageUrl":"http://dummyimage.com/216x196.jpg/5fa2dd/ffffff","stockQty":22,"discount":4,"categoryId":"Baby Girl"},
// {"title":"Benzalkonium Chloride","price":43.09,"description":"tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac","imageUrl":"http://dummyimage.com/207x107.jpg/5fa2dd/ffffff","stockQty":9,"discount":6,"categoryId":"Shorts"},
// {"title":"Triclosan","price":45.42,"description":"erat eros viverra eget congue eget semper rutrum nulla nunc purus","imageUrl":"http://dummyimage.com/200x133.jpg/ff4444/ffffff","stockQty":88,"discount":23,"categoryId":"Dress"},
// {"title":"Athletes Foot Spray","price":32.5,"description":"consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non","imageUrl":"http://dummyimage.com/125x142.jpg/5fa2dd/ffffff","stockQty":94,"discount":15,"categoryId":"Baby Girl"},
// {"title":"GIANT PUFFBALL","price":98.98,"description":"lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse","imageUrl":"http://dummyimage.com/244x157.jpg/cc0000/ffffff","stockQty":36,"discount":4,"categoryId":"Woman Trousers"},
// {"title":"IBUTILIDE FUMARATE","price":73.44,"description":"luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi","imageUrl":"http://dummyimage.com/128x115.jpg/cc0000/ffffff","stockQty":78,"discount":22,"categoryId":"Dress"},
// {"title":"lisinopril","price":84.78,"description":"nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in","imageUrl":"http://dummyimage.com/113x105.jpg/ff4444/ffffff","stockQty":71,"discount":23,"categoryId":"Flat shoes"},
// {"title":"MELOXICAM","price":49.95,"description":"amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo","imageUrl":"http://dummyimage.com/204x180.jpg/cc0000/ffffff","stockQty":59,"discount":10,"categoryId":"Baby Girl"},
// {"title":"Brome Grass","price":51.55,"description":"faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit","imageUrl":"http://dummyimage.com/243x202.jpg/ff4444/ffffff","stockQty":89,"discount":17,"categoryId":"Woman Sweatshirt"},
// {"title":"Acetaminophen,Phenylephrine HCl, Chlorpheniramine maleate","price":12.1,"description":"in quis justo maecenas rhoncus aliquam lacus morbi quis tortor","imageUrl":"http://dummyimage.com/154x102.jpg/cc0000/ffffff","stockQty":96,"discount":7,"categoryId":"Flat shoes"},
// {"title":"Warfarin","price":80.33,"description":"imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in","imageUrl":"http://dummyimage.com/145x230.jpg/cc0000/ffffff","stockQty":32,"discount":6,"categoryId":"Baby Girl"},
// {"title":"Alcohol","price":40.26,"description":"viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae","imageUrl":"http://dummyimage.com/109x180.jpg/5fa2dd/ffffff","stockQty":46,"discount":17,"categoryId":"Heeled shoes"},
// {"title":"Sodium Fluoride","price":52.7,"description":"suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum","imageUrl":"http://dummyimage.com/179x215.jpg/dddddd/000000","stockQty":97,"discount":15,"categoryId":"Overalls"},
// {"title":"DIPHENHYDRAMINE HYDROCHLORIDE","price":93.96,"description":"elit proin risus praesent lectus vestibulum quam sapien varius ut blandit","imageUrl":"http://dummyimage.com/104x217.jpg/dddddd/000000","stockQty":79,"discount":9,"categoryId":"Tights"},
// {"title":"CEFPROZIL","price":60.71,"description":"tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus","imageUrl":"http://dummyimage.com/124x196.jpg/5fa2dd/ffffff","stockQty":100,"discount":18,"categoryId":"Men Shirt"}];