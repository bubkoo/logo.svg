var path = require('path');

module.exports = {
  font: path.resolve(__dirname, '../fonts/gubblebum-blocky.ttf'),
  fontSize: 72,
  kerning: true,   // if true takes kerning information into account
  divided: false,  // generate individual path for every char
  grouped: false,  // if true group the divided path with `<g></g>`
  spacing: 0       // letter spacing
};
