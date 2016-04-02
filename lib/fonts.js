var fs         = require('fs');
var path       = require('path');
var isAbsolute = require('path-is-absolute');

var userHome = process.env.HOME;
var fontDirs = {
  darwin: [
    userHome + '/Library/Fonts/',
    '/Library/Fonts/',
    '/System/Library/Fonts/'
  ],
  freebsd: '',
  linux: userHome + '/.fonts/',
  sunos: '',
  win32: ''
};

var preset  = path.resolve(__dirname, '../fonts/');
var fontDir = fontDirs[process.platform];


exports.getFontPath = function (font) {

  var result = font;

  if (!result) {
    throw new Error('You must specify a font');
  }

  // absolute path or url
  if (isAbsolute(result) || result.match(/^http(s)?:\/\//)) {
    return result;
  }

  result = path.resolve(process.cwd(), font);

  try {
    var stat = fs.statSync(result);
    if (stat && stat.isFile()) {
      return result;
    }
  } catch (e) { }

  result = doSearch(preset, font);

  if (result) {
    return result;
  }

  result = exports.searchFont(font);

  if (!result) {
    throw new Error('Unknown font: ' + font);
  }

  return result;
};

exports.searchFont = function (font) {

  if (Array.isArray(fontDir)) {
    for (var i = 0, l = fontDir.length; i < l; i++) {
      var dir = fontDir[i];
      var ret = doSearch(dir, font);

      if (ret) {
        return ret;
      }
    }
  } else {
    if (fontDir) {
      return doSearch(fontDir, font);
    }
  }
};


function doSearch(dir, font) {

  var fonts = fs.readdirSync(dir);
  if (fonts && fonts.length) {

    font = font.toLowerCase();

    for (var i = 0, l = fonts.length; i < l; i++) {
      var name = fonts[i];
      if (name.toLowerCase() === font) {
        return path.join(dir, name);
      }
    }
  }
}
