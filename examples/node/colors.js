var l = require('../../')();

// TEXT COLOR - color(), bold(), underline()

  // Default: 'black'
  // Available colors: 'black', 'red', 'green', 'yellow', 'purple', 'pink', 'cyan', 'grey'
  var str = 'hello';

  str.log.color('black');
  str.log.color('red');
  str.log.color('green');

  str.log.bold('yellow');
  str.log.bold('purple');
  str.log.bold('pink');

  str.log.underline('cyan');
  str.log.underline('grey');

  // LowerCase: Not required
  str.log.color('Yellow');
  str.log.bold('PuRpLe');
  str.log.underline('GREEN');

// BACKGROUND COLOR - background()

  // Default: 'white'
  // Available colors: 'black', 'red', 'green', 'yellow', 'purple', 'pink', 'cyan', 'grey'
  var str = 'hello';

  str.log.background('black');
  str.log.background('red');
  str.log.background('green');
  str.log.background('yellow');
  str.log.background('purple');
  str.log.background('pink');
  str.log.background('cyan');
  str.log.background('grey');

  // LowerCase: Not required
  str.log.background('Yellow');
  str.log.background('PuRpLe');
  str.log.background('GREEN');

// ************************

// Log strings
var str = 'hello';
str.log('red');
l('hello world');
l.color('hello world!!!', 'red');
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
