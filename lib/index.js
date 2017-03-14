
import React, { Component, PropTypes } from 'react'
import Flatpickr from 'flatpickr'

class DateTimePicker extends Component {

  static propTypes = {
    options: PropTypes.object,
  }

  static defaultProps = {
    options: {}
  }

  componentWillReceiveProps(props) {
    this.flatpickr.setDate(props.value, false)

    const optionsKeys = Object.getOwnPropertyNames(props.options)

    for (let index = optionsKeys.length - 1; index >= 0; index--) {
      const key = optionsKeys[index]
      this.flatpickr.set(key, props.options[key])
    }
  }

  componentDidMount() {
    var origOnChange = this.props.onChange
    function onChange(v) {
      if (v && v[0]) {
        origOnChange(v)
      }
    }

    const options = {
        ...this.props.options,
        onChange: onChange
    }

    this.flatpickr = new Flatpickr(this.node, options)
  }

  componentWillUnmount() {
    this.flatpickr.destroy()
  }

  render() {
    // ignore onChange, options
    // eslint-disable-next-line no-unused-vars
    const { onChange, options, defaultValue, value, ...props } = this.props
    return (
      <input {...props} defaultValue={defaultValue || value} ref={node => this.node = node} />
    )
  }
}

export default DateTimePicker
