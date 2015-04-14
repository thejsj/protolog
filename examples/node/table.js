var l = require('../../')();

// Log strings
var str = 'hello jkfl; djkfl; sajfkl;d jskl fjdkls jfldk sjafldk sjafld jskalf dsjalfk djskalf jdksla fjdksla fjdksla fjdksla fjdksla fjdksal fdjskalf djskalf djfk ldsa';
str.log.table();

// Log objects
var obj = { 'a': 'a', b: 'b' };
obj.log.table();

// Log arrays
var arr = [1,2,3,4,5];
arr.log.table();

// Log numbers
var number = 3453453.23423;
number.log.table();

