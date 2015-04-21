var FutureLog = function (value, logStr) {
  __self = {};
  __self.value = value;
  __self.str = logStr;
};

FutureLog.prototype.setString = function (str) {
  __self.str = str;
};

FutureLog.prototype.getString= function () {
  if (__self.str.valueOf !== undefined) {
    return __self.str.valueOf();
  }
  return __self.str;
};

FutureLog.prototype.getValue = function () {
  if (__self.value === null) return null;
  if (__self.value === undefined) return undefined;
  if (__self.value.valueOf === undefined) return __self.value;
  return __self.value.valueOf();
};

module.exports = FutureLog;
