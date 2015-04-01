# Protolog

Protolog as a global `.log` method to all variables in JavaScript. It basically [monkeypatches]() `console.log` into the `Object` prototype. The idea is to add a simple shorcut to logging by making all variables loggable, like this:

```
'a'.log()
```
![Protolog In the Browser]()

The `.log` method returns the object itself. In this way, you can plug `.log` statements anywhere in your code without it interfering with the flow of your code.

```
var a = 5;

5 === a.log() // true
a.log() === a // true
```

![Showing equality in the browser]()

Alternitavely, you can do:
```
if (a === 5) {
  doSomething();
}
```
Is the same as:
```
if (a.log() === 5) {
  doSomething();
}
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

```
http://protolog.thejsj.com/dist/latest.min.js
```
