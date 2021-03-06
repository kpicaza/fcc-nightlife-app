var express = require('express');
var routes = require('./routes/router.js');
var passport = require('passport');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var flash = require('express-flash');
var path = require('path');
var requestUser = require('./src/user/application/middleware/request-user');

var app = express();
require('dotenv').load();
require('./config/passport')(passport);

// Assets

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'pug');
app.use('/jquery', express.static(path.join(__dirname, "node_modules/jquery/dist")));
app.use('/md5', express.static(path.join(__dirname, "node_modules/blueimp-md5/js")));
app.use('/bootstrap', express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use('/tether', express.static(path.join(__dirname, "node_modules/tether/dist")));
app.use(
  '/font-awesome/css',
  express.static(path.join(__dirname, "node_modules/font-awesome/css")));
app.use(
  '/font-awesome/fonts',
  express.static(path.join(__dirname, "node_modules/font-awesome/fonts")));
app.use(
  '/material/material.min.css',
  express.static(path.join(__dirname, "node_modules/material-design-lite/material.min.css")));
app.use(
  '/material/material.min.js',
  express.static(path.join(__dirname, "node_modules/material-design-lite/material.min.js")));
app.use(
  '/dialog-polyfill/dialog-polyfill.css',
  express.static(path.join(__dirname, "node_modules/dialog-polyfill/dialog-polyfill.css")));
app.use(
  '/dialog-polyfill/dialog-polyfill.js',
  express.static(path.join(__dirname, "node_modules/dialog-polyfill/dialog-polyfill.js")));
app.use(
  '/slick-carousel',
  express.static(path.join(__dirname, "node_modules/slick-carousel/slick")));
app.use('/js/user', express.static(path.join(__dirname, "src/user/infrastructure/client")));
app.use('/js/plan', express.static(path.join(__dirname, "src/plan/infrastructure/client")));
app.use('/js/common', express.static(path.join(__dirname, "src/util")));

// Backend

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator({}));
app.use(require('cookie-parser')());
app.use(flash());
app.use(session({
  secret: 'secretClementine',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(requestUser);


routes(app, passport);

const port = process.env.PORT || 8080;
app.listen(port,  function () {
  console.log('Node.js listening on port ' + port + '...');
});
