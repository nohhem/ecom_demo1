
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const User = require('../models/user');


// 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
const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key:
                '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'
        }
    })
);

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false,
        errorMessage: message
    });
};

exports.postLogin =  (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const tempcart = req.session.tempCart;
    User.findOne({ email: email })
        .then((user) =>  {
            if (!user) {
                req.flash('error', 'We dont have this email in our records ');
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(async doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        //check if there is a tempcart to merge
                        console.log('check existance of tmepcart ',tempcart);
                        if(tempcart){
                            console.log('there is a temp cart to merge')
                            await user.mergeCart(tempcart);
                            //delete the tempcart
                            delete req.session.tempCart;
                        }
                        return req.session.save(err => {
                            res.redirect('/');
                        });
                    }
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
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false,
        errorMessage: message
    });
};


exports.postSignup = (req, res, next) => {
    const fullname = req.body.fullname
    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    const tempcart = req.session.tempCart;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', ' E-Mail exists already, please pick a different one.');
                return res.redirect('/signup');
            }
            if (cpassword != password) {
                req.flash('error', 'password are not matching ');
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
                .then(async user => {
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    if(tempcart){
                        console.log('there is a temp cart to merge')
                        await user.mergeCart(tempcart);
                        //delete the tempcart
                        delete req.session.tempCart;
                    }
                    return req.session.save(empty => {
                        res.redirect('/');
                    });
                });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getResetPassword = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: message
    });
};

exports.postResetPassword = (req, res, next) => {

    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            console.log("something went wrong")
            return res.redirect('/reset_password');
        }
        const token = buffer.toString('hex');
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    req.flash('error', 'We couldnt find this email in our records');
                    return res.redirect('/reset_password');
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {
                console.log("we send the email")
                res.redirect('/login');
                transporter.sendMail({
                    to: req.body.email,
                    from: 'gofast.team3@gmail.com',
                    subject: 'Password reset',
                    html: `
              <p>You requested a password reset</p>
              <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
            `
                });
            })
            .catch(err => {
                console.log(err);
            });
    });
};


exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then(user => {

            res.render('auth/setNewpassword', {
                path: '/new-password',
                pageTitle: 'New Password',
                userId: user._id.toString(),
                passwordToken: token
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;

    User.findOne({
        resetToken: passwordToken,
        resetTokenExpiration: { $gt: Date.now() },
        _id: userId
    })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
};




