# Protolog


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
- table
- time
- prettify
- time
- info / data / type
- json

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

- Count
- Pluck
- Filter
- hasFields
- keys
- map
- first
- last
- unique
