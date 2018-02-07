
import * as React from 'react'
import Flatpickr, { Instance } from 'flatpickr'

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

export interface Options {
  wrap?: boolean,
  minDate?: string;
  maxDate?: string | Date;
  mode?: "range" | "single" | "multiple";
  onClose?: Handler
}

export type Handler = (e: Event | any, str?: any) => void;

export interface Props {
  defaultValue?: string,
  options?: Options,
  onChange?: Handler,
  onOpen?: Handler,
  onClose?: Handler,
  onMonthChange?: Handler,
  onYearChang?: Handler,
  onReady?: Handler,
  onValueUpdate?: Handler,
  onDayCreate?: Handler,
  value?: string | any[] | number | Date;
  className?: string;
  children?: any;
}

export default class DateTimePicker extends React.Component<Props> {
  flatpickr!: Flatpickr.Instance;
  node!: HTMLElement;

  static defaultProps = {
    options: {},
    value: new Date()
  }

  componentWillReceiveProps(props: Props) {
    const { options } = props
    const prevOptions = this.props.options

    // Add prop hooks to options
    hooks.forEach(hook => {
      if (props.hasOwnProperty(hook)) {
        (options as any)[hook] = (props as any)[hook]
      }
      // Add prev ones too so we can compare against them later
      if (this.props.hasOwnProperty(hook)) {
        (prevOptions as any)[hook] = (this.props as any)[hook]
      }
    })

    const optionsKeys = Object.getOwnPropertyNames(options)

    for (let index = optionsKeys.length - 1; index >= 0; index--) {
      const key = optionsKeys[index]
      let value = (options as any)[key]

      if (value !== (prevOptions as any)[key]) {
        // Hook handlers must be set as an array
        if (hooks.indexOf(key) !== -1 && !Array.isArray(value)) {
          value = [value]
        }

        this.flatpickr.set(key as any, value)
      }
    }

    if (props.hasOwnProperty('value') && props.value !== this.props.value) {
      this.flatpickr.setDate(props.value!, false)
    }
  }

  componentDidMount() {
    const options = {
      onClose: () => {
        this.node.blur && this.node.blur()
      },
      ...this.props.options
    }

    // TODO: This can be cleaned up
    // Add prop hooks to options
    hooks.forEach(hook => {
      if ((this.props as any)[hook]) {
        (options as any)[hook] = (this.props as any)[hook]
      }
    })

    this.flatpickr = Flatpickr(this.node, options) as Instance;

    if (this.props.hasOwnProperty('value')) {
      this.flatpickr.setDate(this.props.value!, false)
    }
  }

  componentWillUnmount() {
    this.flatpickr.destroy()
  }

  ref = (node: any) => {
    this.node = node;
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { options, defaultValue, value, children, ...props } = this.props

    // Don't pass hooks to dom node
    hooks.forEach(hook => {
      delete (props as any)[hook]
    })

    return options!.wrap
      ? (
        <div {...props} ref={this.ref} >
          {children}
        </div>
      )
      : (
        <input {...props} defaultValue={defaultValue}
          ref={this.ref} />
      )
  }
}

