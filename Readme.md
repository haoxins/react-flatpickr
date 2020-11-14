[![NPM version][npm-img]][npm-url]
[![License][license-img]][license-url]
[![Dependency status][david-img]][david-url]

# react-flatpickr

[Flatpickr](https://github.com/chmln/flatpickr) for React.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Basic props](#basic-props)
  - [defaultValue](#defaultValue)
  - [value](#value)
  - [children](#children)
  - [className](#className)
- [Event handlers](#event-handlers)
- [Advanced props](#advanced-props)
- [Troubleshooting](#troubleshooting)

## Installation

This package can be install with `yarn` or `npm`

`npm`

```bash
npm install --save react-flatpickr
```

`yarn`

```bash
yarn add react-flatpickr
```

## Usage

```jsx
// Keep in mind that these are the styles from flatpickr package
// See troubleshooting section in case you have problems importing the styles

import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";
import { Component } from "react";

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
      <Flatpickr
        data-enable-time
        value={date}
        onChange={date => {
          this.setState({ date });
        }}
      />
    );
  }
}
```

## Basic props

### defaultValue

> `string` | optional

This is the default value that will be passed to the inner input

### value

> `string || array || object || number` | optional

Same as below

### options

> `Object` | optional

- `Flatpickr options`: you can pass all `Flatpickr parameters` [here](https://flatpickr.js.org/options).
- All `Flatpickr` [hooks][hooks] can be passed within this option too.

_*Example*_:

```jsx
<Flatpickr options={{ minDate: "2017-01-01" }} />
```

### children

> `node` | optional

This option is closely related with the [wrap option](https://flatpickr.js.org/examples/#flatpickr-external-elements) from `Flatpickr`, please refer to the former link for more information.

### className

> `string` | optional

Custom className that will be applied to the inner `input` element. In case you need to modify the rendered `input` styles this is the `prop` you should use.

## Event handlers

The following `props` are provided in order to customize the `Flatpickr's functions` default behaviour. Please refer to the [Events & Hooks section](https://flatpickr.js.org/events/) from `Flatpickr` library.

### onChange

> `function` | optional

### onOpen: function

> `function` | optional

### onClose: function

> `function` | optional

### onMonthChange: function

> `function` | optional

### onYearChange: function

> `function` | optional

### onReady: function

> `function` | optional

### onValueUpdate: function

> `function` | optional

### onDayCreate: function

> `function` | optional

### onDestroy: function

> `function` | optional

## Advanced props

### render

> `function` | optional

Use this `prop` if you want to `render` your custom component, this is a [Render props pattern](https://reactjs.org/docs/render-props.html).

_Example usage_:

```jsx
  import React from 'react';
  import Flatpickr from 'react-flatpickr';

  const CustomInput = ({ value, defaultValue, inputRef, ...props }) => {
    return <input {...props} defaultValue={defaultValue} ref={inputRef} />;
  };

  export default function App {
    return (
      <Flatpickr
        render={
          ({defaultValue, value, ...props}, ref) => {
            return <CustomInput defaultValue={defaultValue} inputRef={ref} />
          }
        }
      />
    )
  }
```

## Themes

Please import themes directly from the `flatpickr` dependency.

## Troubleshooting

#### Help, the Date Picker doesn't have any styling!

> In most cases, you should just be able to `import 'flatpickr/dist/themes/airbnb.css'`, but in some cases npm or yarn may install `flatpickr` in `node_modules/react-flatpickr/node_modules/flatpickr`. If that happens, removing your `node_modules` dir and reinstalling should put flatpickr in the root `node_modules` dir, or you can import from `react-flatpickr/node_modules/flatpickr` manually.

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
