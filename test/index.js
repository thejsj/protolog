var consoleStub = require('./console-overwrite');
var should = require('should');
var l = require('../index')( {
  loggingFunction: consoleStub,
  appendToPrototype: false
});

describe('Log function', function () {

  it('should log a string, when given a string', function () {
    l('hello');
    consoleStub.getLastLog().should.equal('hello');
    l('not-hello');
    consoleStub.getLastLog().should.not.equal('hello');
  });

  it('should log a number, when given an number', function () {
    l(5);
    consoleStub.getLastLog().should.equal(5);
  });

  it('should log an Object when given an object', function () {
    l({ value: 5 });
    consoleStub.getLastLog().should.eql({ value: 5 });
  });

  it('should log an array when given an array', function () {
    l([1, 2, 3]);
    consoleStub.getLastLog().should.eql([1, 2, 3]);
  });

});

describe('Global Prototype Function', function () {

  it('should not set the global `.log` method if indicated in the option', function () {
    should()'hello'.log;
  });

  it('should console.log from the prototype `.log` method', function () {
    var l = require('../index')( {
      loggingFunction: consoleStub,
      appendToPrototype: false
    });
    'hello'.log();
    consoleStub.getLastLog().should.equal('hello');
    'not-hello'.log();
    consoleStub.getLastLog().should.not.equal('hello');
    l({ value: 5 });
    consoleStub.getLastLog().should.eql({ value: 5 });
    l([1, 2, 3]);
    consoleStub.getLastLog().should.eql([1, 2, 3]);
  });

  it('should set the propertyName of the method according to the `propertyName` option', function () {

  });


});
