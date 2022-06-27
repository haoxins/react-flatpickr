
import 'flatpickr/dist/themes/material_green.css'

import React, { Component } from 'react'
import { render } from 'react-dom'

import Flatpickr from '../lib/index.js'

class App extends Component {
  state = {
    v: '2016-01-01 01:01',
    onChange: (_, str) => {
      console.info(str)
    },
    range: [new Date()],
    startDate: new Date(),
    endDate: new Date(),
    handler: (dates => {
      console.log('initial handler', dates)
    })
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
    const { v, startDate, endDate, range } = this.state

    const sharedOptions = {
      enableTime: true,
    }

    return (
      <main>
        <Flatpickr data-enable-time className='test'
          onChange={[
            (_, str) => { console.info('First prop handler', str) },
            (_, str) => { console.info('Second prop handler', str) },
          ]}
          options={{
            onChange: [
              (_, str) => { console.info('First options handler', str) },
              (_, str) => { console.info('Second options handler', str) },
            ]
          }}
        />
        <Flatpickr data-enable-time defaultValue='2016-11-11 11:11'
          onChange={this.state.handler} />
        <button type="button"
          onClick={() => {
            this.setState(state => ({
              ...state,
              handler: (dates) => {
                console.log('new handler', dates)
              }
            }))
          }}
        >
          Change handler
        </button>
        <Flatpickr data-enable-time value={v}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={v} options={{minDate: '2016-11-01'}}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={range} options={{mode: 'range'}}
          onChange={(dates, str) => {
            this.setState(state => ({
              ...state,
              range: dates,
            }))
            console.info('range changed', dates, str)}
          } />
        <Flatpickr onChange={this.state.onChange}
          onOpen={() => { console.info('opened (by prop)') }}
          options={{
            onClose: () => {
              console.info('closed (by option)')
            },
            maxDate: new Date()
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
        <Flatpickr
          defaultValue='2019-05-05'
          onCreate={(flatpickr) => { this.calendar = flatpickr }}
          onDestroy={() => { delete this.calendar }}
          render={({ defaultValue }, ref)=>{
            return (
              <div>
                <input defaultValue={ defaultValue } ref={ref} />
                <button onClick={() => this.calendar.setDate(new Date())}>Today</button>
              </div>
            )
          }} />

      <div>
        <h2>Shared</h2>
        <Flatpickr
          value={startDate} options={sharedOptions} onChange={(date) => {
            this.setState(state => ({
              ...state,
              startDate: date,
            }))
          }} />
        <Flatpickr
          value={endDate} options={sharedOptions} onChange={(date) => {
            this.setState(state => ({
              ...state,
              endDate: date,
            }))
          }} />

        <dl>
          <dt>Start</dt>
          <dd>{startDate?.toString()}</dd>
          <dt>End</dt>
          <dd>{endDate?.toString()}</dd>
        </dl>
      </div>
      </main>
    )
  }
}

window.init = () => {
  render(<App />, document.querySelector('#container'))
}
