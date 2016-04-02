![logo.svg](https://cdn.rawgit.com/bubkoo/logo.svg/master/logo.svg)

> Generate svg logo

## Install

```
$ npm install logo.svg -g
```

## Usage

### CLI

```
$ logo [options]
```

**Options:**

```
  -l, --logo ??? ............. The logo text. Default is the `name` of the `package.json`.
  -f, --font ??? ............. Specify the font path or url.
  -s, --fontSize ??? ......... Specify the font size. Default `72`.
  -o, --output ??? ........... Specify the output path. Default `logo.svg`
  -c, --config ??? ........... Specify the `.logorc` file.
  -O, --overwrite ............ Overwrite when a logo file exist. Default `true`.
  -k, --kerning .............. Take kerning information into account. Default `true`.
  -d, --divided .............. Generate individual path for every char. Default `false`.
  -V, --version .............. Print the current version.
  -h, --help ................. You're looking at it.
  -h, --help ??? ............. Show details for the specified command.
```

**Examples:**

```
  $ logo
  $ logo -Odo ./logo/logo.svg
  $ logo --config ./logo/.logorc
  $ logo --help
  $ logo --help font
  $ logo --help config
  $ logo --version
```

### As a module

```js
var logo = require('logo.svg');
// generate the svg string, then you can use it in you code
var svg = logo.generate(options);
```

## Options

### font

The font's path or full url. If it's an url, we will load the font asynchronous then generate the logo.

If the path is relative, it is relative to the current work directory(`process.cwd()`). 

If the path is a basename, such as `fontName.ttf`, we will fisrtly try to load it as a relative path, if that failed we will search it from the **preset** folder, and then search it from system and user fonts folders.

The preset folder is `./fonts/`, you can contribute yours by [pull request](https://github.com/bubkoo/logo.svg/pulls).

### logo

The logo text. The `name` in `package.json` by default.

### options for `string-to-path`

All the options of [string-to-path](https://github.com/bubkoo/string-to-path#options) are valid. 

## Styling the logo

All the styling options of [string-to-path](https://github.com/bubkoo/string-to-path#styling-the-elements) are valid. 

## .logorc

All the options can be specified in the following files:

- .logorc.js
- .logorc.yaml
- .logorc.yml
- .logorc.json
- .logorc
- The `logo` section in `package.json`

We will try to load configuration from these files order by order, stop **until** any file load succeed.

Example for `.logorc`:

```yaml
font: Origami-Mommy-Pixellated.ttf
fontSzie: 72
output: logo.svg
# style the logo
path:
  fill: '#6ccb99'
```

Example for `package.json`:

```json
{
  "name": "module",
  "version": "1.0.0",
  .
  .
  .
  "logo": {
    "font": "Origami-Mommy-Pixellated.ttf",
    "fontSzie": 72,
    "output": "logo.svg",
    "path": {
      "fill": "#6ccb99"
    }
  },
  .
  .
  .
}
```


## Embed the logo

