/**
 * Overwrite the console object in order to be able to test the module
 */

log = console.log.bind(console);

console.log = function (str) {
  if (this._logs === undefined) {
    this._logs = [];
  }
  this._logs.push(str);
  log(str);
};

console.getLastLog = function () {
  if (this._logs === undefined) {
    this._logs = [];
  }
  return this._logs[this._logs.length - 1];
};
