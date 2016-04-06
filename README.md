![logo.svg](https://cdn.rawgit.com/bubkoo/logo.svg/d05cbb1/logo.svg)

> Generate a svg logo, then you can embed it in you README.md

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/bubkoo/logo.svg/blob/master/LICENSE)

[![npm:](https://img.shields.io/npm/v/logo.svg.svg?style=flat-square)](https://www.npmjs.com/packages/logo.svg)
[![build:?](https://img.shields.io/travis/bubkoo/logo.svg/master.svg?style=flat-square)](https://travis-ci.org/bubkoo/logo.svg)


**Feature:**

- Custom font, font size, letter spacing
- Generate individual path for every char
- Support any valid attributes and style
- Handily cli


## Install

To use the `logo` command, install it globally:

```
$ npm install logo.svg -g
```

To use the JavaScript API, install `logo.svg` locally:

```
$ npm install logo.svg --save
```

If you need both the `logo` command and the JavaScript API, install `logo.svg`.js both ways.


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

### JavaScript API

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

The preset folder is `./fonts/`, contribute your fonts by [pull request](https://github.com/bubkoo/logo.svg/pulls).

### logo

The logo text. Default is the `name` in `package.json`.

### x

Horizontal position of the beginning of the text. (default: `0`)

### y

Vertical position of the baseline of the text. (default: `0`)

### fontSize

Size of the text. (default: `72`)

### spacing

The letter spacing. (default: `0`)

### kerning

If `true` takes kerning information into account. (default: `true`)

### divided

If `true` generates individual path for every char. (default: `false`)

### grouped

If `true` groups the individual `<path>` with `<g></g>` element. (default: `false`)

### title

If specified will generate a `<title>` at the root of `<svg>`. (default: `logo`)

### desc

If specified will generate a `<desc>` at the root of `<svg>`. (default: `null`)


## Styling the logo

Specify the padding of the `<path>` relative to the `<svg>`:

- options.padding
- options.paddingTop or options['padding-top']
- options.paddingRight or options['padding-right']
- options.paddingBottom or options['padding-bottom']
- options.paddingLeft or options['padding-left']

The `<svg>`, `<path>` and `<g>` elements can be styled by any valid attributes. 

The generated `<svg>` has the following default attributes:

```js
{
	'version'    : '1.1',
    'xmlns'      : 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    'role'   : 'img',
    'width'  : width,
    'height' : height,
    'viewbox': [x, y, width, height].join(' ')
}
```

We can **add**/**update**/**remove** by `options.svg`:

```js
options.svg = {
	'version': '',     // remove this attribute
    'role'   : 'logo', // update this attribute
    'fill'   : 'red'   // add some custiom styles
}
```

**Note** that the `width`, `height` and `viewbox` can't be specified.

Styling the `<path>` by `options.path`. If `divided` is `true` we can style the individual `<path>` element by `options.path?`, which `?` is the index of each char in the `logo`:

```js
// style for every path(s)
options.path  = {
    'fill': yellow
};

// style the first char
options.path0 = {
    'fill': '#FF0000',
    'stroke': '#000000'
};
```

As the same `options.g` specified the style of `<g>` element. 


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
 
  "logo": {
    "font": "Origami-Mommy-Pixellated.ttf",
    "fontSzie": 72,
    "output": "logo.svg",
    "path": {
      "fill": "#6ccb99"
    }
  },
  
}
```


## Embed the logo

SVG does not work from README by design for security concerns [...](http://stackoverflow.com/a/21521184/895245)

> We have had to disable svg image rendering on GitHub.com due to potential cross site scripting vulnerabilities.

So, we can not embed by the raw url, [rawgit.com](http://rawgit.com/) solves this problem nicely. For each request, it retrieves the appropriate document from GitHub and, crucially, serves it with the correct Content-Type header.

Link to your logo.svg using the following pattern:

```
https://cdn.rawgit.com/<repo-owner>/<repo>/<branch>/path/to.svg
```

To ensure that the CDN always serves the version of the file you want, use a git tag or commit hash in the file's path instead of a branch name, and update the URL if you push a new version of the file.

So, instead of a URL like `https://cdn.rawgit.com/user/repo/branch/file`, use a URL like `https://cdn.rawgit.com/user/repo/tag/file` or `https://cdn.rawgit.com/user/repo/commit/file`.


The embed code looks like:

```mk
![logo.svg](https://cdn.rawgit.com/<repo-owner>/<repo>/<branch>/path/to.svg)

<img alt="logo.svg" width="500" src="https://cdn.rawgit.com/<repo-owner>/<repo>/<branch>/path/to.svg">
```

## Demos

<img alt="npm" width="450" src="https://cdn.rawgit.com/bubkoo/logo.svg/3321802/demos/gubblebum-blocky/npm.svg">

![divided](https://cdn.rawgit.com/bubkoo/logo.svg/3321802/demos/origami-mommy/divided.svg)

![blocked](https://cdn.rawgit.com/bubkoo/logo.svg/3321802/demos/blocked/blocked.svg)

![square](https://cdn.rawgit.com/bubkoo/logo.svg/3321802/demos/mk-zodnig-square/square.svg)

![gubblebum](https://cdn.rawgit.com/bubkoo/logo.svg/3321802/demos/gubblebum/gubblebum.svg)


## Related
   
- [text2svg](https://github.com/bubkoo/text2svg) Convert text to svg path.
- [loadrc](https://github.com/bubkoo/loadrc) Load runtime configuration files for your module.


## TODO

- Support logo template.
- What's your suggestion? Open an [issue](https://github.com/bubkoo/logo.svg/issues).
