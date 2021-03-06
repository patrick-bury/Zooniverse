// Generated by CoffeeScript 1.3.3
(function() {
  var Api, Favorite, ProfileItem, Recent, User,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Api = require('../api');

  ProfileItem = require('./profile_item');

  Favorite = require('./favorite');

  User = require('./user');

  Recent = (function(_super) {

    __extends(Recent, _super);

    Recent.configure('Recent', 'project_id', 'workflow_id', 'subjects', 'created_at', 'favorited', 'favorite_id');

    function Recent() {
      this.favorite = __bind(this.favorite, this);

      this.unfavorite = __bind(this.unfavorite, this);
      Recent.__super__.constructor.apply(this, arguments);
    }

    Recent.url = function(params) {
      return Recent.withParams("/projects/" + User.project + "/users/" + User.current.id + "/recents", params);
    };

    Recent.fetch = function() {
      if (User.current) {
        return Recent.__super__.constructor.fetch.apply(this, arguments);
      }
    };

    Recent.fromJSON = function(results) {
      var item, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = results.length; _i < _len; _i++) {
        item = results[_i];
        _results.push(Recent.create(item));
      }
      return _results;
    };

    Recent.prototype.unfavorite = function() {
      var fetcher;
      if (!this.favorited) {
        return;
      }
      try {
        Favorite.find(this.favorite_id).destroy();
      } catch (error) {

      }
      fetcher = Api["delete"]("/projects/" + User.project + "/favorites/" + this.favorite_id);
      this.favorited = false;
      this.favorite_id = null;
      return fetcher;
    };

    Recent.prototype.favorite = function() {
      var fav,
        _this = this;
      fav = new Favorite({
        subjects: this.subjects
      });
      return fav.send().onSuccess(function(favorite) {
        _this.favorited = true;
        return _this.favorite_id = favorite.id;
      });
    };

    return Recent;

  }).call(this, ProfileItem);

  module.exports = Recent;

}).call(this);
