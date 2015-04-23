module.exports = {

  beginning: '\033[',
  end: '\033[0m',

  colors: {
    'black':  '0m',
    'red':    '1m',
    'green':  '2m',
    'yellow': '3m',
    'purple': '4m',
    'pink':   '5m',
    'cyan':   '6m',
    'grey':   '7m'
  },

  text: '3', // \033[ + 3 + 0m
  bold : '1;', // \033[1;30m
  underline : '4;', // \033[4;40m
  background : '4'

};
