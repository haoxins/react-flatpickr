
import 'flatpickr/dist/flatpickr.material_green.min.css'

import React, { Component } from 'react'
import { render } from 'react-dom'

import Flatpickr from '../'

class App extends Component {
  render() {
    return (
      <Flatpickr data-enable-time className='test'
        onChange={(obj, str, ins) => console.info(obj, str, ins)} />
    )
  }
}

window.init = () => {
  render(<App />, document.querySelector('#container'))
}
