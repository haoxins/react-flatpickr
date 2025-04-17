import {ChangeEventHandler, ReactNode, RefObject} from 'react';
import flatpickr from 'flatpickr';
import {DateOption, Options} from 'flatpickr/dist/types/options';

export type Callback = (arg0?: flatpickr.Instance | null) => void;

export type OptionsType = {
  [k in keyof Options]?: Options[k];
};

export interface DateTimePickerProps {
  defaultValue?: string;
  options?: OptionsType;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onOpen?: flatpickr.Options.Hook;
  onClose?: flatpickr.Options.Hook;
  onMonthChange?: flatpickr.Options.Hook;
  onYearChange?: flatpickr.Options.Hook;
  onReady?: flatpickr.Options.Hook;
  onValueUpdate?: flatpickr.Options.Hook;
  onDayCreate?: flatpickr.Options.Hook;
  onCreate?: Callback;
  onDestroy?: Callback;

  value?: DateOption | DateOption[];
  children?: ReactNode;
  className?: string;
  ref?: RefObject<DateTimePickerHandle | undefined>;

  render?: (props: any, handleNodeChange: (node: HTMLElement | null) => void) => ReactNode;
}

export interface DateTimePickerHandle {
  flatpickr?: flatpickr.Instance;
}
