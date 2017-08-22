import express from 'express';
import passport from 'passport';
import Router from './routes/router';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'express-flash';
import path from 'path';
import dotEnv from 'dotenv';
import security from './config/passport';

let app = express();
dotEnv.load();
security(passport);

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'pug');
app.use('/jquery', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use('/md5', express.static(path.join(__dirname, "../node_modules/blueimp-md5/js")));
app.use('/bootstrap', express.static(path.join(__dirname, "../node_modules/bootstrap/dist")));
app.use('/tether', express.static(path.join(__dirname, "../node_modules/tether/dist")));
app.use('/font-awesome/css', express.static(path.join(__dirname, "../node_modules/font-awesome/css")));
app.use('/font-awesome/fonts', express.static(path.join(__dirname, "../node_modules/font-awesome/fonts")));
app.use('/js/user', express.static(path.join(__dirname, "src/user/infrastructure/client")));
app.use('/js/common', express.static(path.join(__dirname, "src/util")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator({}));
app.use(cookieParser());
app.use(flash());
app.use(session({
  secret: 'secretClementine',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());


const router = new Router(app, passport);
router.routes();
router.apiRoutes();

const port = process.env.PORT || 8080;
app.listen(port,  function () {
  console.log('Node.js listening on port ' + port + '...');
});
