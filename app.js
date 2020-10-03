//Import Libraries Native nodeJS:
const path = require('path');

//3rd Party Packages:
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const Category = require('./models/category');
const User = require('./models/user');
//



const MONGODB_URI =
  'mongodb+srv://gofast:Go123456789@cluster0.e46es.mongodb.net/db_ecom';

const errorController = require('./controllers/error');
const testController = require('./controllers/test');

//const authController = require('./controllers/auth');

//----------------------Global variables--------------------------//
//----------------------------------------------------------//
const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();
app.use(flash());

Category.find({}).then(result => {
  app.locals.categories = result;
});



// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   }
// });


//Templating Engine EJS:
app.set('view engine', 'ejs');
app.set('views', 'views');

//Import Routes :
// const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


//Defining app Middlewares:
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// );
app.use((express.static(path.join(__dirname, 'public'))));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use(session({
  secret: 'my secret',
  store: store,
  resave: false,
  saveUninitialized: false //should be false so that it we do not store session for nothing
}));
//Mware for csrf protection
app.use(csrfProtection);


// app.use(flash());

//to auhtenticate any response we send to the user (the user will recieve a valid csrf token to be used for his next request)
//

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      res.locals.user = user; //m.zobi ? not sure 
      req.user = user; //attach the current session user to the request,in order to access the user in any controller //noh
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  //any var registred to res.locals is global and can be accessed directly bby writing its name ex: csrfToken
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken(); //we need to include it as hidden input in every post request 
  next();
});



//Routes Middlewares:
// app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// app.use(authRoutes);
// app.use(errorController.get404);
// app.get('/500', errorController.get500);

// ???????? recheck from videos
// a MW to handle general inetrnal error from the server 
// app.use((error, req, res, next) => {
//   // res.status(error.httpStatusCode).render(...);
//   // res.redirect('/500');
//   res.status(500).render('500', {
//     pageTitle: 'Error!',
//     path: '/500',
//     isAuthenticated: req.session.isLoggedIn
//   });
// });


mongoose
  .connect(MONGODB_URI,{ useNewUrlParser: true ,useUnifiedTopology: true} )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
