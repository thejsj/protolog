var _defaults = require('lodash/object/defaults');

var colorProps = {

  textColors : {
    'black': 30,
    'red': 31,
    'green': 32,
    'yellow': 33,
    'blue': 34,
    'purple': 35,
    'cyan': 36,
    'white': 37
  },

  bgColors : {
    'black': 40,
    'red': 41,
    'green': 42,
    'yellow': 43,
    'blue': 44,
    'purple': 45,
    'cyan': 46,
    'white': 47
  }

}

        console.log('\033[4;32m\033[40m', bootstrap,'\033[0m');
        console.log('\033[4;32m', bootstrap, '\033[0m');

var colorUtils = {

  makeCode: function(options) {
    options = _defaults(opts || {}, {
      color: 'black',
      type: null,
      background: false
    });

    var prefix = '\033[';
    var type = (options.type === null) ? '' : options.type;
    var color = (background.color) ? colorProps.textColors[options.color] : colorProps.bgColors[options.color]

    return prefix + type + color + 'm';
  },

  resetCode: function() {
    return '\033[0m';
  },

  error: function() {

  }

}

var colorFunc = {

  color: function(color) {
    var options = {
      code: colorUtils.makeCode(this);,
      obj: this,
      reset: colorUtils.resetCode();
    }
    var options = {
      color: color,
      type: null,
      background: false
    }
    return ;
  },

  bold: function(color) {
    var options = {
      color: color,
      type: 1,
      background: false
    }
    return makeCode(options);
  },

  underline: function(color) {
    var options = {
      color: color,
      type: 4,
      background: false
    }
    return makeCode(options);
  },

  background: function(color) {
    var options = {
      color: color,
      type: null,
      background: true
    }
    return makeCode(options);
  },

  log: function(){
    console.log();
  }

}

module.exports = colorProperties;
