var log = console.log.bind(console);

var protoLog = function (obj) {
  log(obj.valueOf());
  return obj;
};

module.exports = protoLog;
