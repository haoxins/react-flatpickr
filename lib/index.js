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
const hookPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.arrayOf(PropTypes.func)
])

const callbacks = [
  'onCreate',
  'onDestroy'
]

const callbackPropTypes = PropTypes.func

class DateTimePicker extends Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    options: PropTypes.object,
    onChange: hookPropType,
    onOpen: hookPropType,
    onClose: hookPropType,
    onMonthChange: hookPropType,
    onYearChange: hookPropType,
    onReady: hookPropType,
    onValueUpdate: hookPropType,
    onDayCreate: hookPropType,
    onCreate: callbackPropTypes,
    onDestroy: callbackPropTypes,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    children: PropTypes.node,
    className: PropTypes.string,
    render: PropTypes.func
  }

  static defaultProps = {
    options: {}
  }

  componentDidUpdate(prevProps) {
    if (this.props.hasOwnProperty('value') && this.props.value !== prevProps.value) {
      this.flatpickr.setDate(this.props.value, false)
    }

    const { options } = this.props
    const prevOptions = prevProps.options

    hooks.forEach(hook => {
      if (this.props.hasOwnProperty(hook)) {
        options[hook] = this.props[hook]
      }
      // Add prev ones too so we can compare against them later
      if (prevProps.hasOwnProperty(hook)) {
        prevOptions[hook] = prevProps[hook]
      }
    })

    const optionsKeys = Object.getOwnPropertyNames(options)
    for (let index = optionsKeys.length - 1; index >= 0; index--) {
      const key = optionsKeys[index]
      let value = options[key]

      if (value !== prevOptions[key]) {
        // Hook handlers must be set as an array
        if (hooks.indexOf(key) !== -1 && !Array.isArray(value)) {
          value = [value]
        }

        this.flatpickr.set(key, value)
      }
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
    hooks.forEach(hook => {
      if (this.props[hook]) {
        options[hook] = this.props[hook]
      }
    })

    this.flatpickr = new Flatpickr(this.node, options)

    if (this.props.hasOwnProperty('value')) {
      this.flatpickr.setDate(this.props.value, false)
    }

    const { onCreate } = this.props
    if (onCreate) onCreate(this.flatpickr)
  }

  componentWillUnmount() {
    const { onDestroy } = this.props
    if (onDestroy) onDestroy(this.flatpickr)
    this.flatpickr.destroy()
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { options, defaultValue, value, children, render, ...props } = this.props
    const ref = (node) => { this.node = node }

    // Don't pass hooks and callbacks to dom node
    hooks.forEach(hook => {
      delete props[hook]
    })
    callbacks.forEach(callback => {
      delete props[callback]
    })

    if (render) return render({ ...props, defaultValue, value }, ref)

    return options.wrap
      ? (
        <div {...props} ref={ref}>
          { children }
        </div>
      )
      : (
        <input {...props} defaultValue={defaultValue} ref={ref} />
      )
  }
}

export default DateTimePicker
