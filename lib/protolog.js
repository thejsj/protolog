var bind = require('lodash/function/bind');

var log = bind(console.log, console);

module.exports = function (opts, self) {

    self = (self === undefined) ? false : self;

    var protoLog = function (obj) {
      log((self || obj).valueOf());
      return obj;
    };

    protoLog.color = function (obj, color) {
      log('color(', color, obj, '):', (self || obj).valueOf());
    };

    return protoLog;
};
