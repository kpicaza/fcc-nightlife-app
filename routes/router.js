'use strict';

var container = require('../config/container');

module.exports = function (app, passport) {

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

  app.route('/').get(container.SearchPlanForm());

  app.route('/plans/search').post(container.MakeSearch());

  // user routes

  app.route('/login')
    .get(onlyAnon, container.LoginForm())
    .post(onlyAnon, passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid username or password.'
    }), container.Login());

  app.route('/register')
    .get(onlyAnon, container.RegisterForm())
    .post(onlyAnon, container.RegisterValidator(), container.CreateAnUser());

  app.route('/logout')
    .get(function (req, res) {
      req.logout();
      res.redirect('/login');
    });

  // api routes

  app.route('/api/users/usernames')
    .post(container.CheckUsername());

  app.route('/api/users/emails')
    .post(container.CheckEmail());

  app.route('/api/users/passwords')
    .post(container.CheckPassword());

  app.route('/api/venues/:id')
    .get(container.ObtainVenueInfo());

  app.route('/api/plans/:id/assistants')
    .post(isLoggedIn, container.AssistToPlan())
    .delete(isLoggedIn, container.CantAssistToPlan());

};
