var bind = require('lodash/function/bind');
var colorCodes = require('./color-codes.js');

module.exports = function (opts, self) {

  var log = bind(opts.loggingFunction.log, opts.loggingFunction);
  var isNode = (module !== undefined && module.exports !== undefined);

  /*!
   * If our `exports` function is called by our prototype
   * then a `self` will be passed which will be used by
   * all methods as the main value to be logged
   */
  var self = (self === undefined) ? false : self;

  var __self = {};

  __self.getColor = function (property, color) {
    color = color.toLowerCase();
    if (color === undefined) color = 'black';
    if (colorCodes[property][color] !== undefined) return colorCodes.text[color];
    return colorCodes.text.black;
  };

  __self.getTwoDimensionalArray = function (obj) {
    var getArrayValue = function (level, val)  {
      if (level > 1) {
        if (val === undefined) return 'undefined';
        if (val === null) return 'null';
        return val.toString();
      }
      if (Array.isArray(val)) {
        return val.map(getArrayValue.bind(null, level + 1));
      }
      return getArrayValue(level + 1, [val]);
    };
    return getArrayValue(0, obj);
  };

  var protoLog = (function () {
    // Our main logging function
    var __protolog = function (obj) {
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
    log(__self.getColor('text', color), obj.valueOf(), colorCodes.reset);
    return obj.valueOf();
  };

  protoLog.bold = function (obj, color) {
    log(__self.getColor('bold', color), obj.valueOf(), colorCodes.reset);
    return obj.valueOf();
  };

  protoLog.underline = function (obj, color) {
    log(__self.getColor('underline', color), obj.valueOf(), colorCodes.reset);
    return obj.valueOf();
  };

  protoLog.background = function (obj, color) {
    log(__self.getColor('background', color), obj.valueOf(), colorCodes.reset);
    return obj.valueOf();
  };

   protoLog.table = function (obj) {
     // Convert value into a two dimensional array
     var arr = __self.getTwoDimensionalArray(obj);
     console.log(arr);
     // Convert two dimensional array into table
     var tbl = {
       top : '+-',
       mid : '| ',
       bot : '+-'
     };

     for(var i = 0; i < arr.length; i++){
       for(var ii = 0; ii < arr[i].length; ii++){
         tbl.top += '-';
         tbl.mid += arr[i][ii];
         tbl.bot += '-';
       }
     }

     tbl.top += '-+';
     tbl.mid += ' |';
     tbl.bot += '-+';

     log(tbl.top.concat('\n', tbl.mid, '\n', tbl.bot));
     return obj;
   };

  /*!
   * Bind every function to self, if self has been provided.
   * Thre is probably a more elegant way of accomplishing this.
   */
  if (self) {
    for (var i in protoLog) {
      protoLog[i] = bind(protoLog[i], null, self);
    }
  }

  return protoLog;
};
