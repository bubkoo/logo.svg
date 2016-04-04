'use strict';

var updater = require('update-notifier');
var cursor  = require('ansi.js')(process.stdout);
var pkg     = require('../package.json');


var notifier = updater({ pkg: pkg });
var update   = notifier.update;

if (update) {

  var latest  = update.latest;
  var current = update.current;
  var spaces  = 47 - 19 - latest.length - current.length;
  var lCount  = Math.round(spaces / 2);
  var rCount  = spaces - lCount;

  cursor
    .write('\n')
    .write('      ----------------------------------------------')
    .write('\n')

    .write('     /')
    .write(Array(lCount).join(' '))
    .write('update available ')
    .grey()
    .write(current)
    .fg.reset().end()
    .write(' → ')
    .green()
    .write(latest)
    .fg.reset().end()
    .write(Array(rCount).join(' '))
    .write('\\')
    .write('\n')

    .write('     \\    run ')
    .magenta()
    .write('(sudo) npm i -g logo.svg ')
    .fg.reset().end().write('to update    /').write('\n')

    .write('      ---------------------------------------------- ')
    .write('\n')
    .write('                \\   ^__^                ').write('\n')
    .write('                 \\  (oo)\\_______       ').write('\n')
    .write('                    (__)\\       )\\/\\  ').write('\n')
    .write('                        ||----w |        ').write('\n')
    .write('                        ||     ||        ').write('\n')
    .write('\n');
}

