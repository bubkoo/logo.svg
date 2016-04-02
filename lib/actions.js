var fs         = require('fs');
var path       = require('path');
var mkdirp     = require('mkdirp');
var cursor     = require('ansi.js')(process.stdout);
var isAbsolute = require('path-is-absolute');
var pkg        = require('../package.json');
var logo       = require('./index');

// exports
// -------

exports.version = function () {
  console.log('  v' + pkg.version);
};

exports.help = function (command) {

  if (!command || command === true) {
    command = 'help';
  }

  try {
    var filepath = path.join('../doc/console', command + '.txt');
    var content  = readFile(filepath);

    console.log(content);
  } catch (e) {
    console.log('"' + command + '" help can\'t be found.\n');
  }
};

exports.generate = function (options) {

  var output    = options.output;
  var overwrite = options.overwrite;

  if (!isAbsolute(output)) {
    output = path.resolve(process.cwd(), output);
  }

  function writeFile() {

    fs.stat(output, function (err, stats) {

      if (stats && stats.isFile() && !overwrite) {

        cursor
          .yellow()
          .write('File "' + output + '" exist, ignored.\n')
          .fg.reset();
      } else {
        try {

          var svg = logo.generate(options);
          fs.writeFile(output, svg, function () {

            cursor
              .green()
              .write('Generated: ' + output + '\n')
              .fg.reset();
          });
        } catch (err) {
          cursor
            .red()
            .write(err.message || ('' + err) || 'Unknown exception.')
            .write('\n')
            .fg.reset();
        }
      }
    });
  }


  var dir = path.dirname(output);

  fs.stat(dir, function (err, stats) {
    if (stats) {
      writeFile();
    } else {
      mkdirp(dir, function (err) {
        if (err) {

          cursor
            .red()
            .write(err.message || ('' + err) || 'Exception occured when make dir.')
            .write('\n')
            .fg.reset();

        } else {
          writeFile();
        }
      });
    }
  });
}


// helpers
// -------

function readFile(filepath) {
  return fs.readFileSync(path.resolve(__dirname, filepath), 'utf8');
}
