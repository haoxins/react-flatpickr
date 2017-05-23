
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Flatpickr from 'flatpickr'

const hooks = [
  'onChange',
  'onOpen',
  'onClose',
  'onMonthChange',
  'onYearChange',
  'onReady',
  'onValueUpdate',
  'onDayCreate'
]

class DateTimePicker extends Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    options: PropTypes.object,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onMonthChange: PropTypes.func,
    onYearChange: PropTypes.func,
    onReady: PropTypes.func,
    onValueUpdate: PropTypes.func,
    onDayCreate: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    children: PropTypes.node
  }

  static defaultProps = {
    options: {}
  }

  componentWillReceiveProps(props) {
    const { options } = props

    if (props.hasOwnProperty('value')) {
      this.flatpickr.setDate(props.value, false)
    }

    // Add prop hooks to options
    for (let hook of hooks) {
      if (props[hook]) {
        options[hook] = props[hook]
      }
    }

    const optionsKeys = Object.getOwnPropertyNames(props.options)

    for (let index = optionsKeys.length - 1; index >= 0; index--) {
      const key = optionsKeys[index]
      let value = props.options[key]

      // Hook handlers must be set as an array
      if (hooks.indexOf(key) !== -1 && !Array.isArray(value)) {
        value = [value]
      }

      this.flatpickr.set(key, value)
    }
  }

  componentDidMount() {
    const options = {
      onClose: () => {
        this.node.blur && this.node.blur()
      },
      ...this.props.options
    }

    // Add prop hooks to options
    for (let hook of hooks) {
      if (this.props[hook]) {
        options[hook] = this.props[hook]
      }
    }

    this.flatpickr = new Flatpickr(this.node, options)

    if (this.props.hasOwnProperty('value')) {
      this.flatpickr.setDate(this.props.value, false)
    }
  }

  componentWillUnmount() {
    this.flatpickr.destroy()
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { options, defaultValue, value, children, ...props } = this.props

    // Don't pass hooks to dom node
    for (let hook of hooks) {
      delete props[hook]
    }

    return options.wrap
      ? (
        <div {...props} ref={node => { this.node = node }}>
          { children }
        </div>
      )
      : (
        <input {...props} defaultValue={defaultValue}
          ref={node => { this.node = node }} />
      )
  }
}

export default DateTimePicker
