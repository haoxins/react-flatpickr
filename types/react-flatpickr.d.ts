import {ComponentPropsWithoutRef, ReactNode, Ref} from 'react';
import flatpickr from 'flatpickr';
import {DateOption, Options} from 'flatpickr/dist/types/options';

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

export type Callback = (arg0?: flatpickr.Instance | null) => void;

export type OptionsType = {
  [k in keyof Options]?: Options[k];
};

export interface DateTimePickerHandle {
  flatpickr?: flatpickr.Instance;
}

export interface DateTimePickerProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'children' | 'value' | 'onChange'> {
  defaultValue?: string;
  options?: OptionsType;
  onChange?: flatpickr.Options.Hook[] | flatpickr.Options.Hook;
  onOpen?: flatpickr.Options.Hook[] | flatpickr.Options.Hook;
  onClose?: flatpickr.Options.Hook[] | flatpickr.Options.Hook;
  onMonthChange?: flatpickr.Options.Hook[] | flatpickr.Options.Hook;
  onYearChange?: flatpickr.Options.Hook[] | flatpickr.Options.Hook;
  onReady?: flatpickr.Options.Hook[] | flatpickr.Options.Hook;
  onValueUpdate?: flatpickr.Options.Hook[] | flatpickr.Options.Hook;
  onDayCreate?: flatpickr.Options.Hook[] | flatpickr.Options.Hook;
  onCreate?: Callback;
  onDestroy?: Callback;

  value?: DateOption | DateOption[];
  children?: ReactNode;
  className?: string;
  ref?: Ref<DateTimePickerHandle | undefined>;

  render?: (props: any, handleNodeChange: (node: HTMLElement | null) => void) => ReactNode;
}
