var bind = require('lodash/function/bind');

var log = bind(console.log, console);

var protoLog = function (obj) {
  if (!(this instanceof protoLog)) {
    return new protoLog(obj);
  }
  log(obj.valueOf());
  return obj;
};

protoLog.color = function (obj, color) {
  log('--color:', color, obj.valueOf());
  log('--color:', obj, this.valueOf());
};

module.exports = function (opts) {
  return protoLog;
};
