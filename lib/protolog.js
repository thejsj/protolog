var bind = require('lodash/function/bind');

var log = bind(console.log, console);

var protoLog = function (opts) {
  return function (obj) {
    log(obj.valueOf());
    return obj;
  };
};

module.exports = protoLog;
