# Protolog


## Install

If in node, use npm:
```
npm install protolog
```

If in the browser, use bower or the CDN:
```
bower install protolog
```

```
http://protolog.thejsj.com/dist/latest.min.js
```

## Logging


'a'.log.info(); // Display with some metadata
'a'.log.table(); // Display as a table


### Strings

```
'a' + 'a'.log();
```

```
'a'
```

### Numbers


### Arrays

### Objects

### Function

### Other Types

### Date, Blob, ArrayBuffer, FileReader, Buffer


## Display Methods

There are different methods by which to display variables. These methods vary for different types. Some methods can only be used on string, some can only be used on arrays and objects, etc.

```
[1, 5, 7].log.table()
```
Will log:
```
+---+---+---+
| 1 | 5 | 7 |
+-------+---+
```

```
var a = function () {};
a.log.time();
```
Will log:

```
Function Execution Time: 1ms
```

Methods:
- color // Any
- underline // Any
- background // Any
- bold // any
- table // Arrays, Objects
- time // Functions
- prettify // Arrays, Objects
- info / data / type // Any
- json // Any

### Chaining 

Order shouldn’t matter. Every method should only do one thing, so that the result of a method is easily predictable.

l.color(‘hello’, ‘green).bold().underline(); // green, bold and underline
l.bold(‘hello’).color(‘green’).underline(); // green, bold and underline
l.underline(‘hello’).underline().color(‘green’); // green, bold and underline

Styling methods should be applied at the end. This simplifies the functionality of the method, and also makes it possible to be compatible with the browser. In the browser, styling can only be applied at the end of a `console.log`.

## Transformations

Data can also be transformed by passing transformations into any log function.

```
[1, 5, 7].log(l.count()); // 5
```

```
var obj1 = { a: 1 };
var obj2 = { a: 2 };
[obj1, obj2].log(l.pluck('a')); // [1, 2]
```
Methods can be combined to form more complex queries:

```
var obj1 = { a: 1 };
var obj2 = { a: 2 };
[obj1, obj2].log(l.pluck('a').count()); // 2
```

Methods

- Count // Array, Objects
- Split
- Pluck // Objects
- Filter // Arrays, Objects
- hasFields // Objects
- keys // Objects
- map // Array
- coerceTo // Array, Object, Number, String
- toArray // Object, String
- first // Array
- last // Array
- unique // Array
- max // Array
- min // Array
