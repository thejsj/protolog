var FutureLog = function FutureLog (value, logStr) {
  __self = {};
  __self.value = value;
  __self.str = logStr;
};

FutureLog.prototype = Object.create(Object.prototype);
FutureLog.prototype.constructor = FutureLog;

/*!
 * Update the log's string
 * @param <String>
 */
FutureLog.prototype.setString = function (str) {
  __self.str = str;
};

/*!
 * Get the log's string value
 * @return <String>
 */
FutureLog.prototype.getString= function () {
  if (__self.str.valueOf !== undefined) {
    return __self.str.valueOf();
  }
  return __self.str;
};

/*!
 * Get the log's original value
 * @return <Any>
 */
FutureLog.prototype.getValue = function () {
  if (__self.value === null) return null;
  if (__self.value === undefined) return undefined;
  if (__self.value.valueOf === undefined) return __self.value;
  return __self.value.valueOf();
};

/*!
 * Styling
 *
 * We want to apply styling properties (color, underline, bold, background) at
 * log time.

FutureLog.prototype.setColor = function () {

};

FutureLog.prototype.setUnderline = function () {

};

FutureLog.prototype.setBold= function () {

};

FutureLog.prototype.setBackground= function () {

};
module.exports = FutureLog;
