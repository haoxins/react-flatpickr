
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
    if (props.value) {
      this.flatpickr.setDate(props.value)
    }
  }

  componentDidMount() {
    const options = {
        ...this.props.options,
        onChange: this.props.onChange
    }

    this.flatpickr = new Flatpickr(this.node, options)
  }

  componentWillUnmount() {
    this.flatpickr.destroy();
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
