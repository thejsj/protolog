var l = require('protolog')({
  'name': 'print'
});

// Log strings
var str = 'hello';
str.print();

// Log objects
var obj = { 'a': 'a', b: 'b' };
obj.print();

// Log arrays
var arr = [1,2,3,4,5];
arr.print();

// Log numbers
var number = 3453453.23423;
number.print();
