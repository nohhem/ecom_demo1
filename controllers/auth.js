
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    console.log("i am here ")

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                // req.flash('error', 'Invalid email or password.');
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        console.log("logged in suc")
                        return req.session.save(err => {
                            res.redirect('/');
                        });
                    }
                    // req.flash('error', 'Invalid email or password.');
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    // req.session.destroy(err => {
    //   console.log(err);
    //   res.redirect('/');
    // });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};


exports.postSignup = (req, res, next) => {

    const fullname = req.body.fullname
    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        fullname: fullname,
                        email: email,
                        password: hashedPassword,
                        cart: { items: [] }
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/');
                });
        })
        .catch(err => {
            console.log(err);
        });
};
