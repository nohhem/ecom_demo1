const User = require('../models/user');
const Product = require('../models/product');


exports.getWishList = (req, res, next) => {
    //let WishList = WishList.hydrate(req.session.tempWishList);
    let catItems;
    res.render('shop/wish_List', {
        pageTitle: 'Cart',
        cartProducts: ""
    });

};

exports.postWishList = (req, res, next) => {
    // here i find the user and then add the products
    //let WishList = WishList.hydrate(req.session.tempWishList);
    console.log("i am here")
    const prodId = req.params.productId;
    console.log(res.locals.user._id)

    User.findById(res.locals.user._id).then(user => {
        console.log(user)
        user.wishlist.push(prodId)
        console.log(user)
        return user.save();

    }).catch(err => {
        console.log(err)
    })




    /*User.findById(res.locals.user._id)
        .then(user => {
            console.log(user)
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });*/

};