var _defaults = require('lodash/object/defaults');

var protoLog = require('./proto-log');

var protoLogWrapper = function (opts) {

  /**
   * Set default options
   * propertyName: 'log'
   * appendPrototypeMethod: true
   */
  opts = _defaults(opts, {
    'name': 'log',
    'appendToPrototype': true
  });

  /**
   * Append a property to the Object prototype
   *
   * Code used by shoud.js libarry
   */
  var extend = function(propertyName, proto) {
    propertyName = propertyName || 'log';
    proto = proto || Object.prototype;
    var prevDescriptor = Object.getOwnPropertyDescriptor(proto, propertyName);

    Object.defineProperty(proto, propertyName, {
      set: function() {
      },
      get: function() {
        return function () {
          return _protoLog(this);
        };
      },
      configurable: true
    });

    return { name: propertyName, descriptor: prevDescriptor, proto: proto };
  };

  if (opt.appendToPrototype !== false) {
    var defaultProto = Object.prototype;
    var defaultProperty = 'log';

    //Expose api via `Object#log`.
    var prevShould = extend(defaultProperty, defaultProto);
  }
  return protoLog(opts);
};

module.exports = protoLogWrapper;
