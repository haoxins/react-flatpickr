
[![NPM version][npm-img]][npm-url]
[![License][license-img]][license-url]
[![Dependency status][david-img]][david-url]

# react-flatpickr

[Flatpickr](https://github.com/chmln/flatpickr) for React.

## Usage

```jsx
import 'flatpickr/dist/themes/material_green.min.css'

import Flatpickr from 'react-flatpickr'
import { Component } from 'react'

class App extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date()
    };
  }

  render() {
    const { date } = this.state;
    return (
      <Flatpickr data-enable-time
        value={date}
        onChange={date => { this.setState({date}) }} />
    )
  }
}
```
* `flatpickr options`: you can pass all `flatpickr parameters` to `props.options`
* All flatpickr [hooks][hooks] can be passed as a react prop, or to `props.options`

```jsx
<Flatpickr options={{minDate: '2017-01-01'}} />
```

### Themes
Please import themes directly from the `flatpickr` dependency. In most cases, you should just be able to `import 'flatpickr/dist/themes/theme.css'`, but in some cases npm or yarn may install `flatpickr` in `node_modules/react-flatpickr/node_modules/flatpickr`. If that happens, removing your `node_modules` dir and reinstalling should put flatpickr in the root `node_modules` dir, or you can import from `react-flatpickr/node_modules/flatpickr` manually.

## License
MIT

[npm-img]: https://img.shields.io/npm/v/react-flatpickr.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-flatpickr
[travis-img]: https://img.shields.io/travis/coderhaoxin/react-flatpickr.svg?style=flat-square
[travis-url]: https://travis-ci.org/coderhaoxin/react-flatpickr
[codecov-img]: https://img.shields.io/codecov/c/github/coderhaoxin/react-flatpickr.svg?style=flat-square
[codecov-url]: https://codecov.io/github/coderhaoxin/react-flatpickr?branch=master
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[david-img]: https://img.shields.io/david/coderhaoxin/react-flatpickr.svg?style=flat-square
[david-url]: https://david-dm.org/coderhaoxin/react-flatpickr
[hooks]: https://chmln.github.io/flatpickr/events/#hooks
