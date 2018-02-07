import 'flatpickr/dist/themes/material_green.css'

import * as React from 'react'
import { render } from 'react-dom'

import Flatpickr from '../src/index'

export interface State {
  v: string;
  onChange: Function;
}

const handler = (_: any, str: string) => console.info(str);

class App extends React.Component<any, State> {
  state = {
    v: '2016-01-01 01:01',
    onChange: handler,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(state => ({
        v: state.v.replace('2016', '2017'),
        onChange: (_: any, str: string) => {
          console.info('New change handler: ', str)
        }
      }))
    }, 2000)
  }

  render() {
    const { v } = this.state



    return (
      <main>
        <Flatpickr
          data-enable-time
          className='test'
          onChange={handler} />
        <Flatpickr
          data-enable-time
          defaultValue='2016-11-11 11:11'
          onChange={handler} />
        <Flatpickr
          data-enable-time value={v}
          onChange={handler} />
        <Flatpickr
          value={v}
          options={{ minDate: '2016-11-01' }}
          onChange={handler} />
        <Flatpickr
          value={[v, '2016-01-10']}
          options={{ mode: 'range' }}
          onChange={handler} />
        <Flatpickr
          onChange={this.state.onChange}
          onOpen={() => { console.info('opened (by prop)') }}
          options={{
            onClose: () => {
              console.info('closed (by option)')
            },
            maxDate: new Date()
          }} />
        <Flatpickr
          value={new Date()}
          onChange={handler}
        />
        <Flatpickr
          value={v}
          options={{ wrap: true }}
          onChange={handler}
        >
          <input type='text' data-input />
          <button type='button' data-toggle > Toggle </button>
          <button type='button' data-clear > Clear </button>
        </Flatpickr>
      </main>
    )
  }
}

(window as any).init = () => {
  render(<App />, document.querySelector('#container'))
}
