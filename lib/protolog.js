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
    var color = (color !== undefined) ? color.toLowerCase() : 'black';
    log(colorCodes.text[color], obj.valueOf(), colorCodes.reset);
    return obj.valueOf();
  };

  protoLog.bold = function (obj, color) {
    var color = (color !== undefined) ? color.toLowerCase() : 'black';
    log(colorCodes.bold[color], obj.valueOf(), colorCodes.reset);
    return obj.valueOf();
  };

  protoLog.underline = function (obj, color) {
    var color = (color !== undefined) ? color.toLowerCase() : 'black';
    log(colorCodes.underline[color], obj.valueOf(), colorCodes.reset);
    return obj.valueOf();
  };

  protoLog.background = function (obj, color) {
    var color = color.toLowerCase();
    log(colorCodes.background[color], obj.valueOf(), colorCodes.reset);
    return obj.valueOf();
  };

   protoLog.table = function (obj) {
     var obj = obj.valueOf();
     var tbl = {
       top : '+-',
       mid : '| ',
       bot : '+-'
     };

     if(typeof obj === 'string'){
       for(var i = 0; i < obj.length; i++){
         tbl.top += '-';
         tbl.mid += obj[i];
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
