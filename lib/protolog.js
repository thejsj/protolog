var bind = require('lodash/function/bind');
var extend = require('lodash/object/extend');
var FutureLog = require('./future-log.js');

module.exports = function (opts, self) {

  var log = bind(opts.loggingFunction.log, opts.loggingFunction);
  var isNode = (module !== undefined && module.exports !== undefined);

  /*!
   * If our `exports` function is called by our prototype
   * then a `self` will be passed which will be used by
   * all methods as the main value to be logged
   */
  self = (self === undefined) ? false : self;

  var __self = {};

  __self.getColor = function (property, color) {
    color = color.toLowerCase();
    if (color === undefined) color = 'black';
    if (colorCodes[property][color] !== undefined) return colorCodes.text[color];
    return colorCodes.text.black;
  };

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

  var protoLog = (function () {
    // Our main logging function
    var __protolog = function (obj) {
      if (obj instanceof FutureLog) {
        obj.applyStyling();
        log(obj.getString());
        return obj.getValue();
      }
      log(obj.valueOf());
      return obj.valueOf();
    };
    /*!
     * if `self` is defined, bind `__protolog` and
     * return it.
     */
    if (self) return __protolog.bind(null, self);
    return __protolog;
  }());

  protoLog.color = function (obj, color) {
    if (!(obj instanceof FutureLog)) obj = new FutureLog(obj);
    obj.setColor(color);
    return obj;
  };

  protoLog.bold = function (obj, color) {
    if (!(obj instanceof FutureLog)) obj = new FutureLog(obj);
    obj.setBold(true);
    return obj;
  };

  protoLog.underline = function (obj, color) {
    if (!(obj instanceof FutureLog)) obj = new FutureLog(obj);
    obj.setUnderline(true);
    return obj;
  };

  protoLog.background = function (obj, color) {
    if (!(obj instanceof FutureLog)) obj = new FutureLog(obj);
    obj.setBackground(color);
    return obj;
  };

  protoLog.table = function (obj) {
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

     if (!(obj instanceof FutureLog)) obj = new FutureLog(obj);
     obj.setString(tblString);
     return obj;
   };

  /*!
   * Bind every function to self, if self has been provided.
   * Thre is probably a more elegant way of accomplishing this.
   */
  if (self) {
    for (var i in protoLog) {
      protoLog[i] = bind(protoLog[i], null, self);
      extend(FutureLog.prototype, protoLog);
    }
  }

  return protoLog;
};
