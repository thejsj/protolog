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
  this.__self = __self;
 /*!
   * Turn any value into a two dimensional array
   * @param <Any>
   * @return <Array>
   */
  __self.getTwoDimensionalArray = function (obj, isTwoDimensionalArray) {
    var getArrayValue = function (level, val)  {
      if (level > 1) {
        if (val === undefined) return 'undefined';
        if (val === null) return 'null';
        return val.toString();
      }
      if (Array.isArray(val)) {
        if (level === 1 && !isTwoDimensionalArray) {
          return [val.toString()];
        }
        return val.map(function (_val) {
          return getArrayValue(level + 1, _val);
        });
      }
     return [ getArrayValue(level + 1, val) ];
    };
    return getArrayValue(0, obj);
  };

  /*!
   * Given a two dimensional array, return an array with all the max column widths
   * The function assumes an array of arrays where all array lengths are equal and
   * all values inside the matrix are strings
   * @param <Array[<Array[<String>]>]>
   * @return <Array [<Number>]>
   */
  __self.getMaxColLengths = function (arr) {
    var maxColLengths = [];
    // Check that all arrays are the same length
    for (var j = 0; j < arr.length; j += 1) {
      if (arr[j].length !== arr[0].length) {
        throw new Error('Arrays in matrix are not all the same length.');
      }
    }
    for (var ii = 0; ii < arr[0].length; ii += 1) {
      var max = 0;
      for (var i = 0; i < arr.length; i += 1) {
        if (typeof arr[i][ii] !== 'string') {
          throw new TypeError('Value of type `' + (typeof arr[i][ii]) + '` inside matrix is not a string');
        }
        max = Math.max(max, arr[i][ii].length);
      }
      maxColLengths[ii] = max;
    }
    return maxColLengths;
  };

  /*!
   * Return true value if value is a two dimensional array
   * @param <Any>
   * @return <Boolean>
   */
  __self.isTwoDimensionalArray = function (value) {
    if (!Array.isArray(value)) return false;
    if (!Array.isArray(value[0])) return false;
    var childArrayLength = value[0].length;
    for (var i = 1; i < value.length; i += 1) {
      if (!Array.isArray(value[i])) return false;
    }
    return true;
  };

  /*!
   * Return true value is a matrix
   * @param <Any>
   * @return <Boolean>
   */
  __self.isMatrix = function (value, isTwoDimensionalArray) {
    if (isTwoDimensionalArray === false) return false;
    // Save some time if we already know it's a 2 dimensional array
    if (isTwoDimensionalArray === true) {
      var childArrayLength = value[0].length;
      for (var i = 1; i < value.length; i += 1) {
        if (value[i].length !== childArrayLength) return false;
      }
      return true;
    }
    // If we also have to check if it's a two dimensional array
    if (!Array.isArray(value)) return false;
    if (!Array.isArray(value[0])) return false;
    var _childArrayLength = value[0].length;
    for (var z = 1; z < value.length; z += 1) {
      if (!Array.isArray(value[z])) return false;
      if (value[z].length !== _childArrayLength) return false;
    }
    return true;
  };

  /*!
   * Return a string that is at least N char long
   * If original string is not long enough, add spaces at the end of string
   * @param <String>
   * @param <Number>
   * @return <String>
   */
  __self.minStringLength = function (str, minLength) {
    if (typeof str !== 'string') throw new TypeError('str argument must be a string. `' + str + '` is not a string.');
    if (typeof minLength !== 'number') throw new TypeError('minLength argument must be a number. `' + minLength + '` is not a number.');
    if (str.length === minLength) return str;
    var remainingChars = minLength - str.length;
    var spaces = '';
    for (var i = 0; i < remainingChars; i += 1) spaces += ' ';
    return str + spaces;
  };

  /*!
   * Take a two dimendional array and make all the arrays in it
   * the same length by adding an empty string
   * @param <Array [<Array>]>
   * @return <Array [<Array>]>
   */
  __self.normalizeTwoDimensionalArrayLength = function (arr) {
    var maxLength = 0;
    if (!Array.isArray(arr)) throw new TypeError('value `' + arr + '` must be an array');
    for (var i = 0; i < arr.length; i += 1) {
      if (!Array.isArray(arr[i])) throw new TypeError('value `' + arr + '` must be an array');
      maxLength = Math.max(maxLength, arr[i].length);
    }
    for (var j = 0; j < arr.length; j += 1) {
      if (arr[j].length !== maxLength) {
        for (var jj = arr[j].length; jj < maxLength; jj += 1) {
          arr[j].push('');
        }
      }
    }
    return arr;
  };


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
FutureLog.prototype.color = function (colorName) {
  if (typeof colorName !== 'string') throw new TypeError('Color (' + colorName + ') must be a string');
  __self.color = colorName;
  return this;
};

/*!
 * Set whether the log should be underlined
 * @param <Boolean>
 * @return <Object>
 */
FutureLog.prototype.underline = function (bool) {
  if (typeof bool !== 'boolean' && bool !== undefined) throw new TypeError('var (' + bool + ') must be a boolean or undefined');
  if (bool === undefined) bool = true;
  __self.underline = bool;
  return this;
};

/*!
 * Set whether the log should be bold
 * @param <Boolean>
 * @return <Object>
 */
FutureLog.prototype.bold = function (bool) {
  if (typeof bool !== 'boolean' && bool !== undefined) throw new TypeError('var (' + bool + ') must be a boolean or undefined');
  if (bool === undefined) bool = true;
  __self.bold = bool;
  return this;
};

/*!
 * Set log background color
 * @param <String>
 * @return <Object>
 */
FutureLog.prototype.background= function (colorName) {
  if (typeof colorName !== 'string') throw new TypeError('Background color (' + colorName + ') must be a string');
  __self.backgroundColor = colorName;
  return this;
};

/*!
 * Set string as table
 * @return <Object>
 */
FutureLog.prototype.table = function () {
   // Convert value into a two dimensional array
    var isArray = Array.isArray(obj);
    var isTwoDimensionalArray = __self.isTwoDimensionalArray(obj);
    var isMatrix = __self.isMatrix(obj, isTwoDimensionalArray);
    var matrix = __self.getTwoDimensionalArray(obj, isTwoDimensionalArray);
    if (isTwoDimensionalArray && !isMatrix) matrix = __self.normalizeTwoDimensionalArrayLength(matrix);
    // If the origin value is an array, append an index to the display matrix as the first column
    if (isArray) {
      for (var j = 0; j < matrix.length; j += 1) {
        matrix[j].unshift('' + j);
      }
    }
    if (isTwoDimensionalArray) {
      matrix.unshift([' ']);
      for (var y = 0; y < matrix[1].length - 1; y += 1) {
        matrix[0].push('' + y);
      }
    }
    var maxColLengths = __self.getMaxColLengths(matrix);

    // Convert two dimensional array into table
    var tblString = '';
    var topBottomRowString = '+';
    for (var z = 0; z < maxColLengths.length; z ++) {
      topBottomRowString += '-';
      for(var zz = 0; zz < maxColLengths[z]; zz++) {
        topBottomRowString += '-';
      }
      topBottomRowString += '-+';
    }

     // rows
    tblString += topBottomRowString + '\n';
     for(var i = 0; i < matrix.length; i++){
       tblString += '|';
       for(var ii = 0; ii < matrix[i].length; ii++){
        tblString += ' ';
        var str = __self.minStringLength(matrix[i][ii], maxColLengths[ii]);
         for(var iii = 0; iii < str.length; iii++){
           tblString += str[iii];
         }
        tblString += ' |';
       }
       tblString += '\n';
       if (i !== (matrix.length - 1)) {
         tblString += topBottomRowString + '\n';
       }
     }
     tblString += topBottomRowString;

     this.setString(tblString);
     return this;
};

/*!
 * Apply styling strings to string
 */
FutureLog.prototype._applyStyling = function () {
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
    } else {
      newStr += colorCodes.colors.black;
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
