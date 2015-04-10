var bind = require('lodash/function/bind');

var log = bind(console.log, console);

module.exports = function (opts, self) {

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
    log('color(', color, '):', obj.valueOf());
    return obj.valueOf();
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
