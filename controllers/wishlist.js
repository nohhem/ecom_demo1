const User = require('../models/user');
const Product = require('../models/product');
let wishListProducts;
exports.getWishList = (req, res, next) => {

    let addedProducts = res.locals.user.wishlist
    wishList_loop(addedProducts).then(products => {
        res.render('shop/wish_List', {
            pageTitle: 'Cart',
            cartProducts: "",
            wishListProducts: products
        })
    })

};

exports.postaddWishList = (req, res, next) => {
    // if product not in list then we add it 
    // if product exist we remove it 
    const prodId = req.params.productId;

    check_dublicate_wishlist_item(prodId, res.locals.user.wishlist).then(isExist => {
        console.log(isExist)
        if (isExist == false) {
            User.findById(res.locals.user._id).then(user => {
                user.wishlist.push(prodId)
                return user.save();
            }).then(() => {
                res.status(200).json({ message: 'Product added succesfully!', data: 'add' });
            }).catch(err => {
                res.status(500).json({ message: 'Adding product failed' });
            });

        } else if (isExist) {
            User.findById(res.locals.user._id).then(user => {
                user.wishlist.remove(prodId);
                return user.save();
            }).then(() => {
                res.status(200).json({ message: 'Product added succesfully!', data: 'remove' });
            }).catch(err => {
                res.status(500).json({ message: 'Adding product failed' });
            });
        }
    })

};

exports.postremoveWishList = (req, res, next) => {
    // here i find the user and then add the products
    //let WishList = WishList.hydrate(req.session.tempWishList);
    const prodId = req.params.productId;


};


async function wishList_loop(addedProducts) {
    // this function takes the product Id that to be added to wish list 
    // then we find the product from data base
    // then i save it in data base 
    let wishListItems = [];
    for (const item of addedProducts) {
        await Product.find({ _id: item }).then(results => {
            wishListItems.push(results[0]);
        })
    }

    return wishListItems;
}

async function check_dublicate_wishlist_item(newProduct, inListProducts) {
    // in this function i check if the product alreay exist in the wish list 
    for (const item of inListProducts) {
        if (newProduct == item) {
            return true
        }
    }
    return false
}