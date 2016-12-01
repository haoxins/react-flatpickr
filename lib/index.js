
import React, { Component, PropTypes } from 'react'
import Flatpickr from 'flatpickr'

class DateTimePicker extends Component {

  static propTypes = {
    id: PropTypes.string
  }

  static defaultProps = {
    options: {}
  }

  state = {
    id: ''
  }

  componentWillMount() {
    this::setDefaultId()
  }

  componentWillReceiveProps(props) {
    if (props.value) {
      this.flatpickr.setDate(props.value)
    }
  }

  componentDidMount() {
    const { id } = this.state

    const node = document.getElementById(id)
    const options = {
        ...this.props.options,
        onChange: this.props.onChange
    }

    this.flatpickr = new Flatpickr(node, options)
  }

  render() {
    // ignore onChange, options
    const { onChange, options, defaultValue, value, ...props } = this.props
    const { id } = this.state
    return (
      <input {...props} id={id} defaultValue={defaultValue || value}/>
    )
  }
}

export default DateTimePicker

/**
 * private
 */

function randomId() {
  let length = 16
  let hexDigits = '0123456789abcdef'
  let s = parseInt(String(Math.random())
    .slice(2))
    .toString('16')
    .split('')
    .slice(0, length)

  s[length - 3] = hexDigits.substr((s[length - 3] & 0x3) | 0x8, 1)

  return s.join('')
}

function setDefaultId() {
  const pid = this.props.id

  if (!this.state.id) {
    if (pid) {
      this.setState({id: pid})
    } else {
      this.setState({id: randomId()})
    }
  }
}
