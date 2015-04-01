# Protolog

Protolog as a global `.log` method to all variables in JavaScript. It basically [monkeypatches]() `console.log` into the `Object` prototype. The idea is to add a simple shorcut to logging by making all variables loggable, like this:

```javascript
'a'.log()
```
![Protolog In the Browser]()

The `.log` method returns the object itself. In this way, you can plug `.log` statements anywhere in your code without it interfering with the flow of your code.

```javascript
var a = 5;

5 === a.log() // true
a.log() === a // true
```

![Showing equality in the browser]()

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

## Install

If in node, use npm:
```
npm install protolog
```

If in the browser, use bower or the CDN:
```
bower install protolog
```

## Options

| name | type | default |
|--------|----------|---------|
| `name` | `String` | `'true'` |

Change the name of the the method to be used for logging. This will be the name of the property to be appended to the `Object` prototype.

| name | type | default |
|---------------------|-----------|---------|
| `appendToPrototype` | `Boolean` | `true` |

Specify wether the `.log` method will be appended to the `Object` prototype and hence be available in all variables. If `false`, you can require this function and then use the library as a normal function. This will be useful once the library has unique methods that enhance logging.

## Is This A Terrible Idea?

Perhaps. But, thankfully, you don't have to use it :).

Monkey-patching is definitely questionable, but the behavior provided by this library is both: very useful and universal. The `.log` method is nothing more than a thin wrapper over `console.log`. The method also implemented responsibly, taking inspiration with [should.js's]() implementation.

## The Future

In the future, this library will include other features for logging in the console/REPL. The two main features included will be transformations: transforming the data you want to log, and display methods: changing the way in which the data is displayed.
