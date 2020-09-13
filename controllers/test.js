const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');
const Order = require('../models/order');

exports.test1 = (req, res , next )=> {

    // User.create('Omar alomar ', 'omreal2009@gmail.com', '123456789');
    const user = new User({
        fullname: 'Omar alomar ',
        email: 'omreal2009@gmail.com',
        password: '123456789'
      });
      user.save().then(result => {

        console.log('Created User');

      })

    console.log('weeelcome ');



}