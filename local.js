var protoLog = require('./lib/index.js');

module.exports = function () {
  // Force the `appendToPrototype` property to be false
  var args = Array.prototype.slice.call(arguments);
  if (args[0] === undefined) args[0] = {};
  args[0].appendToPrototype = false;
  return protoLog.apply(this, args);
};
