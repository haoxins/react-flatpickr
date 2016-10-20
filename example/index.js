
import 'flatpickr/dist/flatpickr.material_green.min.css'

import { render } from 'react-dom'
import { Component } from 'react'

import Flatpickr from '../'

class App extends Component {
  render() {
    return (
      <Flatpickr data-enable-time
        onChange={(obj, str, ins) => console.info(obj, str, ins)} />
    )
  }
}

window.init = () => {
  render(<App />, document.querySelector('#container'))
}
