'use strict';

var EventEmitter = require('events');
var Login = require('../src/user/application/action/login-action');
var LoginForm = require('../src/user/application/action/login-form-action');
var RegisterForm = require('../src/user/application/action/register-form-action');
var CheckUsername = require('../src/user/application/action/check-username');
var CheckEmail = require('../src/user/application/action/check-email');
var CheckPassword = require('../src/user/application/action/check-password');
var CreateAnUser = require('../src/user/application/action/create-user-action');
var RegisterValidator = require('../src/user/application/middleware/register-validator');
var UserRepository = require('../src/user/domain/model/repository');
var mongoUserStore = require('../src/user/infrastructure/db/mongo-user-store');
var SearchForm = require("../src/plan/application/action/search-form");
var MakeSearch = require("../src/plan/application/action/make-search");
var AssistToPlan = require("../src/plan/application/action/assist-to-plan");
var CantAssistToPlan = require("../src/plan/application/action/cant-assist-to-plan");
var PlanRepository = require("../src/plan/domain/model/plan-repository");
var VenueRepository = require("../src/plan/domain/model/venue-repository");
var mongoPlanStore = require("../src/plan/infrastructure/mongo/plan-store");
var venueStore = require("../src/plan/infrastructure/yelp/venue-store");

var container = {

  EventEmitter: function () {
    const emitter = new EventEmitter();

    return emitter;
  },

  // Plan Dependencies

  VenueRepository: function () {
    return new VenueRepository(venueStore, this.EventEmitter());
  },

  PlanRepository: function () {
    return new PlanRepository(mongoPlanStore, this.EventEmitter(), this.VenueRepository());
  },

  SearchPlanForm: function () {
    const searchForm = new SearchForm();

    return searchForm.action;
  },

  MakeSearch: function () {
    const makeSearch = new MakeSearch(this.PlanRepository());

    return makeSearch.action;
  },

  AssistToPlan: function () {
    const assistToPlan = new AssistToPlan(this.PlanRepository());

    return assistToPlan.action;
  },

  CantAssistToPlan: function () {
    const cantAssistToPlan = new CantAssistToPlan(this.PlanRepository());

    return cantAssistToPlan.action;
  },

  // User Dependencies.

  Login: function () {
    const login = new Login();

    return login.action;
  },

  LoginForm: function () {
    const loginForm = new LoginForm();

    return loginForm.action;
  },

  RegisterValidator: function () {
    const registerValidator = new RegisterValidator();

    return registerValidator.check;
  },

  RegisterForm: function () {
    const registerForm = new RegisterForm();

    return registerForm.action;
  },

  UserRepository: function () {
    return new UserRepository(mongoUserStore, this.EventEmitter());
  },

  CheckUsername: function () {
    const checkUsername = new CheckUsername(
      this.UserRepository()
    );

    return checkUsername.action;
  },

  CheckEmail: function () {
    const checkEmail = new CheckEmail(
      this.UserRepository()
    );

    return checkEmail.action;
  },

  CheckPassword: function () {
    const checkPassword = new CheckPassword();

    return checkPassword.action;
  },

  CreateAnUser: function () {
    const createAnUser = new CreateAnUser(
      this.UserRepository()
    );

    return createAnUser.action;
  }


};

module.exports = container;
