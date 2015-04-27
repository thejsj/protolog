var consoleStub = require('./console-overwrite');
var should = require('should');
var expect = require('chai').expect;
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
    expect('hello'.log).to.equal(undefined);
  });

  it('should console.log from the prototype `.log` method', function () {
    var l = require('../index')( {
      loggingFunction: consoleStub,
      appendToPrototype: true
    });
    'hello'.log();
    consoleStub.getLastLog().should.equal('hello');
    'not-hello'.log();
    consoleStub.getLastLog().should.not.equal('hello');
  });

  it('should set the propertyName of the method according to the `propertyName` option', function () {
    var l = require('../index')( {
      loggingFunction: consoleStub,
      appendToPrototype: true,
      propertyName: 'print'
    });
    'hello'.print();
    consoleStub.getLastLog().should.equal('hello');
    'not-hello'.print();
    consoleStub.getLastLog().should.not.equal('hello');
  });

});

describe('Colors', function () {

  it('should display the color red correcltly', function () {
    l.color('wow', 'red').log();
    consoleStub.getLastLog().should.equal([ '\u001b[31m', 'wow', '\u001b[0m' ].join(''));
    l.color('goowdbye', 'red').log();
    consoleStub.getLastLog().should.equal([ '\u001b[31m', 'goowdbye', '\u001b[0m' ].join(''));
  });
});

describe('table', function () {

  it('should display a string, a number of a boolean as a single cell', function () {
    l.table('hello').log();
    consoleStub.getLastLog().split('\n').should.eql([
      '+-------+',
      '| hello |',
      '+-------+'
    ]);
    l.table('2').log();
    consoleStub.getLastLog().split('\n').should.eql([
      '+---+',
      '| 2 |',
      '+---+'
    ]);
    l.table(true).log();
    consoleStub.getLastLog().split('\n').should.eql([
      '+------+',
      '| true |',
      '+------+'
    ]);
  });

  it('should display null or undefined as a single cell', function () {
    l.table(null).log();
    consoleStub.getLastLog().split('\n').should.eql([
      '+------+',
      '| null |',
      '+------+'
    ]);
    l.table(undefined).log();
    consoleStub.getLastLog().split('\n').should.eql([
      '+-----------+',
      '| undefined |',
      '+-----------+'
    ]);
  });

  // One dimensional arrays
  it('should display single level arrays as a single row, width the indexes as the table header', function () {
    l.table(['hello', 'goodbye', 'wow']).log();
    consoleStub.getLastLog().split('\n').should.eql(
      [
       '+---+---------+',
       '| 0 | hello   |',
       '+---+---------+',
       '| 1 | goodbye |',
       '+---+---------+',
       '| 2 | wow     |',
       '+---+---------+',
      ]);
  });

  // Array of arrays
  it('shoud display a two dimensional array with a row for every child array', function () {
    l.table([[1, 'hello', 3], ['wow', 5, 6], [7,'goodbye', 9]]).log();
    consoleStub.getLastLog().split('\n').should.eql(
      [
       '+---+-----+---------+---+',
       '|   | 0   | 1       | 2 |',
       '+---+-----+---------+---+',
       '| 0 | 1   | hello   | 3 |',
       '+---+-----+---------+---+',
       '| 1 | wow | 5       | 6 |',
       '+---+-----+---------+---+',
       '| 2 | 7   | goodbye | 9 |',
       '+---+-----+---------+---+',
      ]);
  });

  it('shoud display a two dimensional array with a row for every child array, displaying all further arrays in a single cell', function () {
    l.table([[1, 'hello', 3], ['wow', 5, 6], [7,'goodbye', [1, 2] ]]).log();
    consoleStub.getLastLog().split('\n').should.eql(
      [
       '+---+-----+---------+-----+',
       '|   | 0   | 1       | 2   |',
       '+---+-----+---------+-----+',
       '| 0 | 1   | hello   | 3   |',
       '+---+-----+---------+-----+',
       '| 1 | wow | 5       | 6   |',
       '+---+-----+---------+-----+',
       '| 2 | 7   | goodbye | 1,2 |', // Perhaps it would be better if it was [1, 2]
       '+---+-----+---------+-----+'
      ]);
  });

  it('shoud display a two dimensional array with a row for every child array, displaying all further arrays in a single cell', function () {
    l.table([[1, 2], [4, 5, 6], [7]]).log();
    consoleStub.getLastLog().split('\n').should.eql(
      [
       '+---+---+---+---+',
       '|   | 0 | 1 | 2 |',
       '+---+---+---+---+',
       '| 0 | 1 | 2 |   |',
       '+---+---+---+---+',
       '| 1 | 4 | 5 | 6 |',
       '+---+---+---+---+',
       '| 2 | 7 |   |   |',
       '+---+---+---+---+'
      ]);
  });

  // Array with multilpe types
  it('shoud display a two dimensional array with a row for every child array, only if all values are arrays', function () {
    l.table([[1, 'hello', 3], ['wow', 5, 6], null]).log();
    consoleStub.getLastLog().split('\n').should.eql(
      [
       '+---+-----------+',
       '| 0 | 1,hello,3 |',
       '+---+-----------+',
       '| 1 | wow,5,6   |',
       '+---+-----------+',
       '| 2 | null      |',
       '+---+-----------+',
      ]);
  });

  // Array of objects

});

describe('Method Chaining', function () {

  it('should be able to add a color and bold', function () {
    l.color('wow', 'green').bold().log();
    consoleStub.getLastLog().should.equal([ '\033[1;32m', 'wow', '\u001b[0m' ].join(''));
    l.bold('wow').color('green').log();
    consoleStub.getLastLog().should.equal([ '\033[1;32m', 'wow', '\u001b[0m' ].join(''));
  });

  it('should be able to add a color, underline and bold', function () {
    l.color('wow', 'green').bold().underline().log();
    consoleStub.getLastLog().should.equal([ '\033[4;1;32m', 'wow', '\u001b[0m' ].join(''));
    l.underline('wow').color('green').bold().log();
    consoleStub.getLastLog().should.equal([ '\033[4;1;32m', 'wow', '\u001b[0m' ].join(''));
  });

  // TODO: Add tests for background AND color chained together
  // I don't know if backgrounds work at all or if they heed to two separted statements

  it('should display a table in the specified color, if set that way', function () {
    l.table('hello').color('green').log();
    consoleStub.getLastLog().split('\n').should.eql([
      '\033[32m+-------+',
              '| hello |',
              '+-------+\u001b[0m'
    ]);
  });

  it('should display a table in the specified color and bold, if set that way', function () {
    l.table('hello').bold().color('green').log();
    consoleStub.getLastLog().split('\n').should.eql([
      '\033[1;32m+-------+',
                '| hello |',
                '+-------+\u001b[0m'
    ]);
  });
});

describe('Method Chaining without the global prototype', function () {

  beforeEach(function () {
    consoleStub.clear();
  });

  it('should be able to add a color', function () {
    'wow'.log.color('green').log();
    consoleStub.getLastLog().should.equal([ '\033[32m', 'wow', '\u001b[0m' ].join(''));
  });

  it('should be able to add a color and bold', function () {
    'wow'.log.color('green').bold().log();
    consoleStub.getLastLog().should.equal([ '\033[1;32m', 'wow', '\u001b[0m' ].join(''));
    'wow'.log.bold().color('green').log();
    consoleStub.getLastLog().should.equal([ '\033[1;32m', 'wow', '\u001b[0m' ].join(''));
  });
});
