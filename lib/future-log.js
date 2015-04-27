var colorCodes = require('./color-codes.js');
var FutureLog = function FutureLog (value, logStr) {
  __self = {};
  __self.value = value;
  __self.str = this.getString();
  // Styling defaults
  __self.color = false;
  __self.background = false;
  __self.bold = false;
  __self.underline = false;
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
  if (__self.str === undefined) __self.str = __self.value;
  if (__self.str === null) return 'null';
  if (__self.str === undefined) return 'undefined';
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
 * log time. Hence, we save the styling properties in the object.
 */

/*!
 * Set log text color
 * @param <String>
 */
FutureLog.prototype.setColor = function (colorName) {
  if (typeof colorName !== 'string') throw new TypeError('Color (' + colorName + ') must be a string');
  __self.color = colorName;
};

/*!
 * Set wether the log should be underlined
 * @param <Boolean>
 */
FutureLog.prototype.setUnderline = function (bool) {
  if (typeof bool !== 'boolean') throw new TypeError('var (' + bool + ') must be a boolean');
  __self.underline = bool;
};

/*!
 * Set wether the log should be bold
 * @param <Boolean>
 */
FutureLog.prototype.setBold= function (bool) {
  if (typeof bool !== 'boolean') throw new TypeError('var (' + bool + ') must be a boolean');
  __self.bold = bool;
};

/*!
 * Set log background color
 * @param <String>
 */
FutureLog.prototype.setBackground= function (colorName) {
  if (typeof colorName !== 'string') throw new TypeError('Background color (' + colorName + ') must be a string');
  __self.backgroundColor = colorName;
};

/*!
 * Apply styling strings to string
 */
FutureLog.prototype.applyStyling = function () {
  if (__self.color || __self.backgroundColor || __self.underline || __self.bold) {
    var newStr = '';
    newStr += colorCodes.beginning;
    if (__self.underline) newStr += colorCodes.underline;
    if (__self.bold) newStr += colorCodes.bold;
    if (__self.background) {
      newStr += colorCodes.background;
    } else {
      newStr += colorCodes.text;
    }
    if (__self.background) {
      newStr += colorCodes.colors[__self.color];
    } else if (__self.color){
      newStr += colorCodes.colors[__self.color];
    }
    newStr += this.getString();
    newStr += colorCodes.end;
    __self.str = newStr;
  }
};

FutureLog.prototype.__get = function () {
  return __self;
};

module.exports = FutureLog;
