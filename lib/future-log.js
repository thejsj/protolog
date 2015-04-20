var FutureLog = function (value, logStr) {
  __self = {};
  __self.value = value;
  __self.str = logStr;
};

FutureLog.prototype.setString = function (str) {
  __self.str = str;
};

FutureLog.prototype.getString= function () {
  return __self.str.valueOf();
};

FutureLog.prototype.getValue = function () {
  return __self.value.valueOf();
};

module.exports = FutureLog;
