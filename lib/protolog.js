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

   var protoLog = (function () {
    // Our main logging function
    var __protolog = function (obj) {
      if (obj.constructor === FutureLog)  {
        obj._applyStyling();
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
    if (obj.constructor !== FutureLog) obj = new FutureLog(obj);
    obj.color(color);
    return obj;
  };

  protoLog.bold = function (obj) {
    if (obj.constructor !== FutureLog) obj = new FutureLog(obj);
    obj.bold(true);
    return obj;
  };

  protoLog.underline = function (obj) {
    if (obj.constructor !== FutureLog) obj = new FutureLog(obj);
    obj.underline(true);
    return obj;
  };

  protoLog.background = function (obj, color) {
    if (obj.constructor !== FutureLog) obj = new FutureLog(obj);
    obj.background(color);
    return obj;
  };

  protoLog.table = function (obj) {
      if (!(obj instanceof FutureLog)) obj = new FutureLog(obj);
     obj.table();
     return obj;
   };

  /*!
   * Bind every function to self, if self has been provided.
   * Thre is probably a more elegant way of accomplishing this.
   */
  if (self) {
    for (var i in protoLog) {
      // extend(FutureLog.prototype, protoLog);
      protoLog[i] = bind(protoLog[i], null, self);
    }
  }

  return protoLog;
};
