const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const wishListController = require('../controllers/wishlist');

const isAuth = require('../middleware/is-auth');

const router = express.Router();
//note check the best practice for naming the routes check ref websites

router.get('/', shopController.getProducts);
router.get('/page=:page', shopController.getProducts);
router.get('/category/page=:page-:categoryId', shopController.getProducts);
router.get('/category/:categoryId', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);


router.get('/view_cart', shopController.getCart);
router.post('/add-to-cart/:productId', shopController.addToCart);

/*-----------------wish list-----------------*/
router.get('/wish_list', isAuth, wishListController.getWishList);
router.post('/add-remove-wish-list/:productId', isAuth, wishListController.postaddWishList);


//router.get('/check_out', shopController.getCheckout);
// router.post('/cart-delete-item', shopController.postCartDeleteProduct);
// router.post('/create-order', shopController.postOrder);
// router.get('/orders', shopController.getOrders);


module.exports = router;
