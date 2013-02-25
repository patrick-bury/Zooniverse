// Generated by CoffeeScript 1.4.0
(function() {
  var $, ProxyFrame,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = require('jqueryify');

  ProxyFrame = (function() {

    ProxyFrame.headers = {};

    function ProxyFrame(host, path) {
      this.host = host;
      this.path = path != null ? path : '/proxy';
      this.receive = __bind(this.receive, this);

      this.send = __bind(this.send, this);

      this.postMessage = __bind(this.postMessage, this);

      this.appended = __bind(this.appended, this);

      this.elFrame = __bind(this.elFrame, this);

      this.append();
      $(window).on('message', this.receive);
    }

    ProxyFrame.prototype.el = function() {
      return $('#api-proxy-frame');
    };

    ProxyFrame.prototype.elFrame = function() {
      return this.el()[0];
    };

    ProxyFrame.prototype.appended = function() {
      return this.elFrame() != null;
    };

    ProxyFrame.prototype.append = function() {
      if (this.appended()) {
        return;
      }
      return $('body').append(this.html());
    };

    ProxyFrame.prototype.html = function() {
      return $('<iframe></iframe>').attr('id', 'api-proxy-frame').attr('src', "" + this.host + this.path).css('display', 'none');
    };

    ProxyFrame.prototype.bind = function(event, callback) {
      return this.el().on(event, callback);
    };

    ProxyFrame.prototype.postMessage = function(message) {
      return this.elFrame().contentWindow.postMessage(JSON.stringify(message), this.host);
    };

    ProxyFrame.prototype.send = function(message) {
      var payload;
      payload = message.payload;
      payload['headers'] = ProxyFrame.headers;
      return this.postMessage(payload);
    };

    ProxyFrame.prototype.receive = function(_arg) {
      var e, message;
      e = _arg.originalEvent;
      if (e.origin !== this.host) {
        return;
      }
      message = JSON.parse(e.data);
      if (message.id !== 'READY') {
        return this.el().trigger('response', message);
      }
    };

    return ProxyFrame;

  })();

  module.exports = ProxyFrame;

}).call(this);