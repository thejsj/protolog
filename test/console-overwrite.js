/**
 * Overwrite the console object in order to be able to test the module
 */

log = console.log.bind(console);

var _console = {};

_console.log = function () {
  var args = Array.prototype.slice.call(arguments);
  if (this._logs === undefined) this._logs = [];
  if (args.length === 1) {
    this._logs.push(args[0]);
    return;
  }
  this._logs.push(args.join(''));
};

_console.getLastLog = function () {
  if (this._logs === undefined) {
    this._logs = [];
  }
  return this._logs[this._logs.length - 1];
};

module.exports = _console;
