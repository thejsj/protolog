var l = require('../../')();

// Log strings
var str = 'hello';
str.log('red');
l('hello world');
l.color('hello world!!!', 'red');
console.log(Object.keys(str.log));
str.log.color('red');

// Log objects
var obj = { 'a': 'a', b: 'b' };
obj.log.color('yellow');

// Log arrays
var arr = [1,2,3,4,5];
arr.log.color('green');

// Log numbers
var number = 3453453.23423;
number.log.color('black');
