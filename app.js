//Import Libraries Native nodeJS:
const path = require('path');

//3rd Party Packages:
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

//Sequelize sessions Store 
const SequelizeStore = require("connect-session-sequelize")(
  session.Store
);

const errorController = require('./controllers/error');
const authController = require('./controllers/auth');
const sequelize = require('./util/database'); //our database connection setup


//Import Sequelize Models 
const Product = require('./models/product');
// const User = require('./models/user');

const app = express();
const store = new SequelizeStore({
    db: sequelize, //sequelize database
  });
const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});


//Templating Engine EJS:
app.set('view engine', 'ejs');
app.set('views', 'views');

//Import Routes :
// const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


//Defining app Middlewares:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use((express.static(path.join(__dirname, 'public'))));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(session({
  secret: 'my secret',
  store: store,
  resave: false, 
  saveUninitialized: false
}));
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

//Routes Middlewares:
// app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);
app.get('/500', errorController.get500);

// ???????? recheck from videos
// app.use((error, req, res, next) => {
//   // res.status(error.httpStatusCode).render(...);
//   // res.redirect('/500');
//   res.status(500).render('500', {
//     pageTitle: 'Error!',
//     path: '/500',
//     isAuthenticated: req.session.isLoggedIn
//   });
// });

//Sequelize Relationships:
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);

//Sequelize Sync Process: (force: for creation & changes in databse schema) ONLY for one time !!!
sequelize
  .sync({ force: true })
  //.sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
