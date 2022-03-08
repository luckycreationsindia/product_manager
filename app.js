const dotenv = require('dotenv');
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const passport = require('passport');
const passportConfig = require('./passport_config');
const MongoDBStore = require('connect-mongodb-session')(session);

dotenv.config({path: './config/config.env'});

const db = require("./model");
global.dbConfig = require("./config/db.config");
const authConfig = require("./config/auth.config");
const Role = db.role;

require('./mongo_connector')();
const sessionStore = new MongoDBStore({
  uri: `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
  databaseName: dbConfig.DB,
  collection: 'sessions',
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000
  }
});

const app = express();

const whitelist = ['http://developer1.com', 'http://developer2.com']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true);
      //callback(new Error())
    }
  }
}

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
passportConfig(passport);
let sess = session({
  key: 'token',
  secret: authConfig.secret,
  store: sessionStore,
  name: 'token',
  touchAfter: 24 * 3600, resave: true, saveUninitialized: true, autoRemove: 'native',
  cookie: {secure: false, maxAge: new Date().getTime() + (60 * 60 * 24 * 1000 * 7)},
});
app.use(sess);

app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require('./routes/index');

app.use('/', indexRouter);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const category = require('./routes/category.route'); // Imports routes for the categories
const categoryadmin = require('./routes/categoryadmin.route'); // Imports routes for the categories
const product = require('./routes/product.route'); // Imports routes for the products
const productadmin = require('./routes/productadmin.route'); // Imports routes for the products

app.use('/api/category', category);
app.use('/api/admin/category', categoryadmin);
app.use('/api/product', product);
app.use('/api/admin/product', productadmin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({"status": "Error", "message": err.message || "Unknown Error"});
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

initial();

module.exports = app;