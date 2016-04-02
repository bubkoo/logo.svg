var fs          = require('fs');
var path        = require('path');
var config      = require('loadrc').load('logorc');
var String2Path = require('string-to-path');
var fonts       = require('./fonts');
var defauts     = require('./defaults');


exports.generate = function (options) {

  options = merge(defauts, config, options);

  var font   = fonts.getFontPath(options.font);
  var logo   = parseLogoName(options);
  var parser = new String2Path(font);

  if (parser) {
    return parser.toSVG(logo, options).svg;
  }
};


// helpers
// -------

function parseLogoName(options) {
  var logo = options.logo || getPackageName();

  if (!logo) {
    throw new Error('You must specify the logo name');
  }

  return logo;
}

function getPackageName() {
  var pkgPath = path.join(process.cwd(), 'package.json');

  try {
    var pkg = require(pkgPath);

    return pkg.name || '';

  } catch (e) {
    return '';
  }
}

function merge() {
  var sources = [].slice.call(arguments);
  var result  = {};

  sources.forEach(function (source) {

    if (source) {
      for (var name in source) {
        if ({}.hasOwnProperty.call(source, name)) {
          result[name] = source[name];
        }
      }
    }

  });

  return result;
}
