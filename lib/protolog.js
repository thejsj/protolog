var bind = require('lodash/function/bind');

var log = bind(console.log, console);

module.exports = function (opts, self) {

    var self = (self === undefined) ? false : self;

    var protoLog = function (obj) {
      log((self || obj).valueOf());
      return obj;
    };

    protoLog.color = function (obj, color) {
      log('color(', color, obj.valueOf(), '):', (self || obj).valueOf());
    };
    /*!
     * The problem with the following line is that it only returns the original protoLog functions
     * It doesn't return the .color methods, because it only binds that specific function and
     * returns a wrapped funcitons.
     * As possible solutions to this problem I could:
     * 1. Create a wrapper that always does an apply with all the correct arguments.
     * 2. Bind every function individually
     *
     * This is ugly and should be fixed
     */
    if (self) {
      for (var i in protoLog) {
        protoLog[i] = bind(protoLog[i], null, self);
      }
    }
    return protoLog;
};
