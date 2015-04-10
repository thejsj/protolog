var bind = require('lodash/function/bind');

var log = bind(console.log, console);

module.exports = function (opts, self) {

    var self = (self === undefined) ? false : self;

    var protoLog = function (obj) {
      log((self || obj).valueOf());
      return (self || obj).valueOf();
    };

    protoLog.color = function (obj, color) {
      log('color(', color, '):', obj.valueOf());
      return obj.valueOf();
    };

    /*!
     * Bind every function to self, if self has been provided.
     * This is ugly and should be fixed
     */
    if (self) {
      for (var i in protoLog) {
        protoLog[i] = bind(protoLog[i], null, self);
      }
    }

    return protoLog;
};
