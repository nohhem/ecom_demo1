const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const cartController = require('../controllers/cart');
const testController = require('../controllers/test');

const router = express.Router();
//note check the best practice for naming the routes check ref websites

router.get('/page=:page-:categoryId', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);

//router.get('/page=:page', shopController.getProducts);
//router.get('/category/page=:page-:categoryId', shopController.getProducts);
//router.get('/:categoryId', shopController.getProducts);

router.get('/', shopController.getProducts);



router.get('/view_cart', cartController.getCart);
//async
router.post('/edit-cart/:productId', cartController.postCartChangeQty);  //edit-cart include: change quantity and delete if qty ==0
router.post('/add-to-cart/:productId', cartController.postAddToCart); //add to cart include :add a new item or increase the quantity of existing item
router.post('/delete-from-cart/:productId', cartController.postCartDeleteItem);

//test routes
router.get('/test0', testController.test0);

//router.get('/check_out', shopController.getCheckout);
// router.post('/cart-delete-item', shopController.postCartDeleteProduct);
// router.post('/create-order', shopController.postOrder);
// router.get('/orders', shopController.getOrders);


module.exports = router;
