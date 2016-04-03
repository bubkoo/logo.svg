#!/usr/bin/env node

var parseArgs = require('minimist');
var actions   = require('../lib/actions');
var updater   = require('update-notifier');
var pkg       = require('../package.json');


updater({ pkg: pkg }).notify();


var argv = parseArgs(process.argv.slice(2), {
  alias: {
    V: 'version',
    h: 'help',
    c: 'config',
    O: 'overwrite',
    o: 'output',
    l: 'logo',
    f: 'font',
    s: 'fontSize',
    k: 'kerning',
    d: 'divided',
  },
  string: [
    'config',
    'output',
    'logo',
    'font'
  ],
  boolean: [
    'overwrite',
    'version',
    'kerning',
    'divided'
  ],
  default: {
    overwrite: true,
    kerning: true
  }
});

if (argv.help) {
  return actions.help(argv.help);
}

if (argv.version) {
  return actions.version();
}

actions.generate(argv);
