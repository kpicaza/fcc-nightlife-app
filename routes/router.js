'use strict';

import container from '../config/container';

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

function onlyAnon(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    return next();
  }
}

class Router {

  constructor(app, passport) {
    this.app = app;
    this.passport = passport;
  }

  routes() {

    this.app.route('/').get(isLoggedIn, function (req, res) {
      res.json({
        hola: 'Mundo!'
      });
    });

    // user routes

    this.app.route('/login')
      .get(onlyAnon, container.LoginForm())
      .post(onlyAnon, this.passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: 'Invalid username or password.'
      }), container.Login());

    this.app.route('/register')
      .get(onlyAnon, container.RegisterForm())
      .post(onlyAnon, container.RegisterValidator(), container.CreateAnUser());

    this.app.route('/logout')
      .get(function (req, res) {
        req.logout();
        res.redirect('/login');
      });

  }

  apiRoutes() {

    // api routes

    this.app.route('/api/users/usernames')
      .post(container.CheckUsername());

    this.app.route('/api/users/emails')
      .post(container.CheckEmail());

    this.app.route('/api/users/passwords')
      .post(container.CheckPassword());

  }
}

export default Router;
