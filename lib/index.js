
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Flatpickr from 'flatpickr'

class DateTimePicker extends Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    options: PropTypes.object,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ]),
    children: PropTypes.node
  }

  static defaultProps = {
    options: {}
  }

  componentWillReceiveProps(props) {
    if (props.hasOwnProperty('value')) {
      this.flatpickr.setDate(props.value, false)
    }

    const optionsKeys = Object.getOwnPropertyNames(props.options)

    for (let index = optionsKeys.length - 1; index >= 0; index--) {
      const key = optionsKeys[index]
      this.flatpickr.set(key, props.options[key])
    }
  }

  componentDidMount() {
    const options = {
      ...this.props.options,
      onChange: this.props.onChange
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
    // ignore onChange
    // eslint-disable-next-line no-unused-vars
    const { onChange, options, defaultValue, value, children, ...props } = this.props
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
