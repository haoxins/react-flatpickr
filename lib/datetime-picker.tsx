import React, {useEffect, useRef, FC, ReactNode, ChangeEventHandler} from 'react';
import flatpickr from 'flatpickr';
import {Options, DateOption} from 'flatpickr/dist/types/options';

const callbacks = ['onCreate', 'onDestroy'] as const;
const hooks = [
  'onChange',
  'onOpen',
  'onClose',
  'onMonthChange',
  'onYearChange',
  'onReady',
  'onValueUpdate',
  'onDayCreate'
] as const;

type OptionsType = {
    [k in keyof Options]?: Options[k];
};

interface DateTimePickerProps {
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
  onCreate?: (arg0?: flatpickr.Instance | null) => void;
  onDestroy?: (arg0?: flatpickr.Instance | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: string | Array<any> | object | number;
  children?: ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (props: any, handleNodeChange: (node: HTMLElement | null) => void) => ReactNode;
}

const mergeHooks = (inputOptions: flatpickr.Options.Options, props: DateTimePickerProps): OptionsType => {
  const options: OptionsType = { ...inputOptions };

  hooks.forEach((hook: string) => {
    if (props.hasOwnProperty(hook)) {
      if (options[hook] && !Array.isArray(options[hook])) {
        options[hook] = [options[hook]];
      } else if (!options[hook]) {
        options[hook] = [];
      }

      const propHook = Array.isArray(props[hook]) ? props[hook] : [props[hook]];
      options[hook].push(...propHook);
    }
  });

  return options;
};

export const DateTimePicker: FC<DateTimePickerProps> = ({
  defaultValue,
  options = {},
  value,
  children,
  render,
  onCreate,
  onDestroy,
  ...props
}) => {
  const nodeRef = useRef<HTMLElement | null>(null);
  const flatpickrRef = useRef<flatpickr.Instance | null>(null);

  useEffect(() => {
    const createFlatpickrInstance = () => {
      let mergedOptions = {
        onClose: () => {
          nodeRef.current?.blur && nodeRef.current.blur();
        },
        ...options,
      };

      mergedOptions = mergeHooks(mergedOptions, props);

      flatpickrRef.current = flatpickr(nodeRef.current as HTMLElement, mergedOptions);

      if (value !== undefined) {
        flatpickrRef.current.setDate(value, false);
      }

      if (onCreate) onCreate(flatpickrRef.current);
    };

    const destroyFlatpickrInstance = () => {
      if (onDestroy) onDestroy(flatpickrRef.current);
      if (flatpickrRef.current) {
        flatpickrRef.current.destroy();
      }
      flatpickrRef.current = null;
    };

    createFlatpickrInstance();

    return () => {
      destroyFlatpickrInstance();
    };
  }, [options, value, onCreate, onDestroy, props]);

  useEffect(() => {
    if (flatpickrRef.current) {
      const mergedOptions = mergeHooks(options, props);

      const optionsKeys = Object.getOwnPropertyNames(mergedOptions);
      for (let index = optionsKeys.length - 1; index >= 0; index--) {
        const key = optionsKeys[index];
        let optionValue = mergedOptions[key];

        if (optionValue.toString() !== flatpickrRef.current.config[key]?.toString()) {
          if (hooks.includes(key as any) && !Array.isArray(optionValue)) {
            optionValue = [optionValue];
          }

          flatpickrRef.current.set(key, optionValue);
        }
      }

      if (value !== undefined && value !== flatpickrRef.current.input.value) {
        flatpickrRef.current.setDate(value as DateOption | DateOption[], false);
      }
    }
  }, [options, value, props]);

  const handleNodeChange = (node: HTMLElement | null) => {
    nodeRef.current = node;
  };

  hooks.forEach((hook) => {
    delete (props as any)[hook];
  });
  callbacks.forEach((callback) => {
    delete (props as any)[callback];
  });

  if (render) {
    return render({ ...props, defaultValue, value }, handleNodeChange);
  }

  return options.wrap ? (
    <div {...props} ref={handleNodeChange}>
      {children}
    </div>
  ) : (
    <input {...props} defaultValue={defaultValue} ref={handleNodeChange} />
  );
};
