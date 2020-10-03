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

exports.addToCartGroup = (req, res, next) => { }

exports.removeFromWishListGroup = (req, res, next) => {
    // console.log(req.body.values)

    let groupWishLIst = JSON.parse(req.body.values);
    let userid = res.locals.user._id

    User.findById(userid).then(user => {
        console.log(user.wishlist)
        for (i = 0; i < user.wishlist.length; i++) {
            for (j = 0; j < groupWishLIst.length; j++) {
                if (groupWishLIst[j] == user.wishlist[i]) {

                    user.wishlist.splice(i, 1);
                }
            }

        }
        return user.save();
    }).then(newWishListuser => {
        console.log("i am the mother fucker " + newWishListuser.wishlist)
        wishList_loop(newWishListuser.wishlist).then(products => {
            res.status(200).json({ data: products });
        })
    })



}


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



