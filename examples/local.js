var l = require('protolog/local')();

// Log numbers
var str = 'hello';
l(str);

// Log objects
var obj = { 'a': 'a', b: 'b' };
l(obj);

// Log array
var arr = [1,2,3,4,5];
l(arr);

// Log number
var number = 3453453.23423;
l(number);
