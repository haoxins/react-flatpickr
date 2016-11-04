
import 'flatpickr/dist/flatpickr.material_green.min.css'

import React, { Component } from 'react'
import { render } from 'react-dom'

import Flatpickr from '../'

class App extends Component {
  state = {
    v: '2016-01-01 01:01'
  }

  componentDidMount() {
    setTimeout(() => {
      const { v } = this.state
      this.setState({
        v: v.replace('2016', '2017')
      })
    }, 2000)
  }

  render() {
    const { v } = this.state

    return (
      <main>
        <Flatpickr data-enable-time className='test'
          onChange={(obj, str, ins) => console.info(obj, str, ins)} />
        <Flatpickr data-enable-time defaultValue='2016-11-11 11:11'
          onChange={(obj, str, ins) => console.info(obj, str, ins)} />
        <Flatpickr data-enable-time value={v}
          onChange={(obj, str, ins) => console.info(obj, str, ins)} />
      </main>
    )
  }
}

window.init = () => {
  render(<App />, document.querySelector('#container'))
}
