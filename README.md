# Protolog

[![NPM](https://nodei.co/npm/protolog.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/protolog/)

- [Introduction](#introduction)
- [Install](#install)
- [Options](#options)
- [Methods](#methods)
    - [`color`](#method-color)
    - [`bold`](#method-bold)
    - [`underline`](#method-underline)
    - [`background`](#method-background)
    - [`table`](#method-table)
    - [Method Chaining](#method-chaining)
    - [Available Colors](#colors)
- [Is this a terrible idea?](#is-this-a-terrible-idea)
- [The Future](#the-future)

## Introduction <a name='introduction'></a>

Protolog as a global `.log` method to all variables in JavaScript. It basically [monkeypatches]() `console.log` into the `Object` prototype. The idea is to add a simple shorcut to logging by making all variables loggable, like this:

```javascript
'a'.log()
```
![Protolog In the Browser](https://raw.githubusercontent.com/thejsj/protolog/master/screenshots/browser-1.png)

The `.log` method returns the object itself. In this way, you can plug `.log` statements anywhere in your code without it interfering with the flow of your code.

```javascript
var a = 5;

5 === a.log() // true
a.log() === a // true
```

![Showing equality in the browser](https://raw.githubusercontent.com/thejsj/protolog/master/screenshots/browser-1.png)

```javascript
if (a === 5) {
  doSomething();
}
```
Is the same as:
```javascript
if (a.log() === 5) {
  doSomething();
}
```

Alternatively, you can just require the module and use it as a replacement for `console.log`:

```javascript
var log = require('protolog/local')();

log('hello');
```

## Install <a name='install'></a>

If in node, use npm:
```
npm install protolog
```

If in the browser, use bower or the CDN:
```
bower install protolog
```

## Options <a name='options'></a>

| name | type | default |
|--------|----------|---------|
| `name` | `String` | `'log'` |

Change the name of the the method to be used for logging. This will be the name of the property to be appended to the `Object` prototype.

| name | type | default |
|---------------------|-----------|---------|
| `appendToPrototype` | `Boolean` | `true` |

Specify wether the `.log` method will be appended to the `Object` prototype and hence be available in all variables. If `false`, you can require this function and then use the library as a normal function. This will be useful once the library has unique methods that enhance logging.

## Methods <a name='methods'></a>

| Method Name |
|--------| 
| [`color`](#method-color) |
| [`bold`](#method-bold) |
| [`underline`](#method-underline) |
| [`background`](#method-background) |
| [`table`](#method-table) |

### `color(colorName <String>)` <a name='method-color'></a>

Change the text color of your logs using one of the [available colors](#colors).

```javascript
“hello”.color(‘green’).log();
```

| name | type | default |
|---------------------|-----------|---------|
| `color` | `String` | `black` |

[See available colors](#colors)

### `bold(colorName <String>)` <a name='method-bold'></a>

Make the text bold and change the text color of your logs and using one of the [available colors](#colors).

```javascript
“hello”.bold(‘green’).log();
```

| name | type | default |
|---------------------|-----------|---------|
| `bold` | `String` | `black` |

[See available colors](#colors)

### `underline(colorName <String>)` <a name='method-underline'></a>

Underline the text bold and change the text color using one of the [available colors](#colors).

```javascript
“hello”.underline(‘green’).log();
```

| name | type | default |
|---------------------|-----------|---------|
| `underline` | `String` | `black` |

[See available colors](#colors)

### `background(colorName <String>)` <a name='method-background'></a>

Change the background color of your logs using one of the [available colors](#colors).

```javascript
“hello”.background(red).log();
```

| name | type | default |
|---------------------|-----------|---------|
| `background` | `String` | `black` |

[See available colors](#colors)

### `table()` <a name='method-table'></a>

Display the values of a variable as a table.

Strings, numbers, booleans, null and undefined get displayed as a single column in a single row:

```javascript
“hello”.table().log();
```

Displays:

```
+-------+
| hello |
+-------+
```

Arrays of a single dimension get displayed as a table with multiple rows with two columns: an index and a value.

```javascript
['hello', 'goodbye', 'wow'].table().log();
```

Displays:

```
+---+---------+
| 0 | hello   |
+---+---------+
| 1 | goodbye |
+---+---------+
| 2 | wow     |
+---+---------+
```

Arrays of two dimensions (where all values inside the arrays are also arrays) get displayed as a table with multiple rows and multiple columns. The first column is the index of the first dimension and the first row is the index for the second dimension.

```javascript
[[1, 2], [4, 5, 6], [7]].table().log();
```

Displays:

```
+---+---+---+---+
|   | 0 | 1 | 2 |
+---+---+---+---+
| 0 | 1 | 2 |   |
+---+---+---+---+
| 1 | 4 | 5 | 6 |
+---+---+---+---+
| 2 | 7 |   |   |
+---+---+---+---+
```

### Method Chaining <a name='method-chaining'>

You can chain methods together to log something in different ways.

Making a log green, bold and underlined.

```
var l = require(‘protolog’)();
log.color(‘hello’, ‘green’).bold().underline().log();
```

Creating a green table:

```
require(‘protolog’)();
[1, 2, 3].log.color(‘green’).table().log();
```

### Available Colors <a name='colors'></a>

Available colors are:

| color  |
|--------|
| Black  |
| Red    |
| Green  |
| Yellow |
| Blue   |
| Purple |
| Cyan   |
| Pink   |
| Grey   |
| White  |

## Is This A Terrible Idea? <a name='is-this-a-terrible-idea'></a>

Perhaps. But, thankfully, you don't have to use it :).

Monkey-patching is definitely questionable, but the behavior provided by this library is both: very useful and universal. The `.log` method is nothing more than a thin wrapper over `console.log`. The method also implemented responsibly, taking inspiration with [should.js's]() implementation.

## The Future <a name='the-future'></a>

In the future, this library will include other features for logging in the console/REPL. The two main features included will be transformations: transforming the data you want to log, and display methods: changing the way in which the data is displayed.
