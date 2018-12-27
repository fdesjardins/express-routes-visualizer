# express-routes-visualizer

An express middleware and endpoint for viewing your app's route hierarchy.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage][coveralls-image]][coveralls-url]
[![Maintainability][code-climate-image]][code-climate-url]

![Hackathon Starter Example][main-image]

Note, this isn't working with `express.Router()` instances at the moment.

## Installation

```sh
npm install --save express-routes-visualizer
```

## Usage

```js
const { middleware, visualizer } = require('express-routes-visualizer')

app.use(
  '/routes',
  middleware({ httpMethods: false }),
  visualizer({ theme: 'dark-blue' })
)
```

### Themes

See [./themes.md](./themes.md) for visuals of each scheme.

- `plain` - a plain scheme with a light background
- `light-gray` - a simple light grayscale theme
- `dark-gray` - a simple dark grayscale theme
- `dark-blue` - a darker blue theme loosely based on the Atom Nord theme
- `burn` - a low-contrast scheme inspired by Zenburn

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[main-image]: .github/main.png
[travis-url]: https://travis-ci.org/fdesjardins/express-routes-visualizer
[travis-image]: https://img.shields.io/travis/fdesjardins/express-routes-visualizer.svg?style=flat
[npm-url]: https://www.npmjs.com/package/express-routes-visualizer
[npm-image]: https://img.shields.io/npm/v/express-routes-visualizer.svg?style=flat
[coveralls-url]: https://coveralls.io/r/fdesjardins/express-routes-visualizer
[coveralls-image]: https://img.shields.io/coveralls/fdesjardins/express-routes-visualizer.svg?style=flat
[code-climate-url]: https://codeclimate.com/github/fdesjardins/express-routes-visualizer/maintainability
[code-climate-image]: https://api.codeclimate.com/v1/badges/629b4edb2f3333f35b43/maintainability
