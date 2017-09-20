
import 'flatpickr/dist/themes/material_green.css'

import React, { Component } from 'react'
import { render } from 'react-dom'

import Flatpickr from '../lib/index.js'

class App extends Component {
  state = {
    v: '2016-01-01 01:01',
    onChange: (_, str) => {
      console.info(str)
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(state => ({
        v: state.v.replace('2016', '2017'),
        onChange: (_, str) => {
          console.info('New change handler: ', str)
        }
      }))
    }, 2000)
  }

  render() {
    const { v } = this.state

    return (
      <main>
        <Flatpickr data-enable-time className='test'
          onChange={(_, str) => console.info(str)} />
        <Flatpickr data-enable-time defaultValue='2016-11-11 11:11'
          onChange={(_, str) => console.info(str)} />
        <Flatpickr data-enable-time value={v}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={v} options={{minDate: '2016-11-01'}}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={[v, '2016-01-10']} options={{mode: 'range'}}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr onChange={this.state.onChange}
          onOpen={() => { console.info('opened (by prop)') }}
          options={{
            onClose: () => {
              console.info('closed (by option)')
            }
          }} />
        <Flatpickr value={new Date()}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={v} options={{wrap: true}}
          onChange={(_, str) => console.info(str)}
        >
          <input type='text' data-input />
          <button type='button' data-toggle>Toggle</button>
          <button type='button' data-clear>Clear</button>
        </Flatpickr>
      </main>
    )
  }
}

window.init = () => {
  render(<App />, document.querySelector('#container'))
}
