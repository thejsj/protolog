var _defaults = require('lodash/object/defaults');

var protoLog = require('./proto-log');

var protoLogWrapper = function (opts) {
  /**
   * Set default options
   * propertyName: 'log'
   * appendPrototypeMethod: true
   */
  opts = _defaults(opts || {}, {
    propertyName: 'log',
    appendToPrototype: true
  });

  /**
   * Append a property to the Object prototype
   *
   * Code used by shoud.js libarry
   */
  var extend = function(propertyName, proto) {
    var prevDescriptor = Object.getOwnPropertyDescriptor(proto, propertyName);

    Object.defineProperty(proto, propertyName, {
      set: function() { },
      get: function() {
        return function () {
          return protoLog(opts)(this);
        };
      },
      configurable: true
    });

    return { name: propertyName, descriptor: prevDescriptor, proto: proto };
  };
  
  if (opts.appendToPrototype !== false) {
    //Expose api via `Object#log`.
    var prevShould = extend(opts.propertyName, Object.prototype);
  }
  return protoLog(opts);
};

module.exports = protoLogWrapper;
