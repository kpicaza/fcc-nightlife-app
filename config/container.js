'use strict';

import EventEmitter from 'events';
import Login from '../src/user/application/action/login-action';
import LoginForm from '../src/user/application/action/login-form-action';
import RegisterForm from '../src/user/application/action/register-form-action';
import CheckUsername from '../src/user/application/action/check-username';
import CheckEmail from '../src/user/application/action/check-email';
import CheckPassword from '../src/user/application/action/check-password';
import CreateAnUser from '../src/user/application/action/create-user-action';
import RegisterValidator from '../src/user/application/middleware/register-validator';
import UserRepository from '../src/user/domain/model/repository';
import mongoUserStore from '../src/user/infrastructure/db/mongo-user-store';


const container = {

  EventEmitter: function () {
    const emitter = new EventEmitter();

    return emitter;
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
  },


};

export default container;
