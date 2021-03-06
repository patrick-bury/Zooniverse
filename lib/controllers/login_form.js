// Generated by CoffeeScript 1.3.3
(function() {
  var $, Controller, Form, LoginForm, User, templates,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = require('jqueryify');

  Controller = require('./controller');

  Form = require('./base_form');

  User = require('../models/user');

  templates = require('../views/login_form');

  LoginForm = (function(_super) {

    __extends(LoginForm, _super);

    LoginForm.prototype.className = 'zooniverse-login-form';

    LoginForm.prototype.events = {
      'click button[name="sign-in"]': 'signIn',
      'click button[name="sign-up"]': 'signUp',
      'click button[name="reset"]': 'reset'
    };

    LoginForm.prototype.elements = {
      '.sign-in': 'signInContainer',
      '.sign-up': 'signUpContainer',
      '.reset': 'resetContainer',
      '.picker': 'signInPickers',
      'button[name="sign-in"]': 'signInButton',
      'button[name="sign-up"]': 'signUpButton',
      'button[name="reset"]': 'resetButton',
      '.picker button': 'pickerButtons',
      '.sign-out': 'signOutContainer'
    };

    function LoginForm() {
      this.onSignIn = __bind(this.onSignIn, this);

      this.reset = __bind(this.reset, this);

      this.signUp = __bind(this.signUp, this);

      this.signIn = __bind(this.signIn, this);
      LoginForm.__super__.constructor.apply(this, arguments);
      this.html(templates.login);
      this.signInForm = new Form.SignInForm({
        el: this.signInContainer
      });
      this.signUpForm = new Form.SignUpForm({
        el: this.signUpContainer
      });
      this.signInForms = $().add(this.signInContainer.add(this.signUpContainer.add(this.resetContainer)));
      this.signOutForm = new Form.SignOutForm({
        el: this.signOutContainer
      });
      User.bind('sign-in', this.onSignIn);
      this.onSignIn();
    }

    LoginForm.prototype.signIn = function() {
      this.signInForms.hide();
      this.signInContainer.show();
      this.pickerButtons.show();
      return this.signInButton.hide();
    };

    LoginForm.prototype.signUp = function() {
      this.signInForms.hide();
      this.signUpContainer.show();
      this.pickerButtons.show();
      return this.signUpButton.hide();
    };

    LoginForm.prototype.reset = function() {
      this.signInForms.hide();
      this.resetContainer.show();
      this.pickerButtons.show();
      return this.resetButton.hide();
    };

    LoginForm.prototype.onSignIn = function() {
      if (User.current) {
        this.el.addClass('signed-in');
        this.signInForms.hide();
        this.signInPickers.hide();
        return this.signOutContainer.show();
      } else {
        this.el.removeClass('signed-in');
        this.signIn();
        this.signInPickers.show();
        return this.signOutContainer.hide();
      }
    };

    return LoginForm;

  })(Controller);

  module.exports = LoginForm;

}).call(this);
