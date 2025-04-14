import React, {useEffect, useRef, FC, useMemo, useCallback} from 'react';
import flatpickr from 'flatpickr';
import {Options, DateOption, Plugin, ParsedOptions} from 'flatpickr/dist/types/options';
import {DateTimePickerProps, OptionsType} from '../types/react-flatpickr';

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

const mergeHooks = (inputOptions: flatpickr.Options.Options, props: DateTimePickerProps): OptionsType => {
  hooks.forEach((hook: string) => {
    const hookFn = props[hook as keyof DateTimePickerProps];
    const existingHookFn = inputOptions[hook as keyof Options];
    if (hookFn) {
      if (existingHookFn && !Array.isArray(existingHookFn)) {
        (inputOptions as any)[hook] = [(inputOptions as any)[hook]];
      } else if (!(inputOptions as any)[hook]) {
        (inputOptions as any)[hook] = [];
      }

      const propHook = Array.isArray(hookFn) ? hookFn : [hookFn];
      if ((inputOptions as any)[hook].length === 0) {
        (inputOptions as any)[hook] = propHook;
      } else {
        (inputOptions as any)[hook].push(propHook);
      }
    }
  });

  hooks.forEach((hook) => {
    delete (props as any)[hook];
  });
  callbacks.forEach((callback) => {
    delete (props as any)[callback];
  });

  return inputOptions;
};

const DateTimePicker: FC<DateTimePickerProps> = (defaultProps) => {
  const props = useMemo(() => ({...defaultProps}), [defaultProps]);
  const {defaultValue, className, options = {}, value, children, render, onChange} = props;
  const mergedOptions = useMemo(() => mergeHooks(options, props), [options, props]);
  const nodeRef = useRef<HTMLElement | null>(null);
  const flatpickrRef = useRef<flatpickr.Instance | null>(null);

  useEffect(() => {
    const createFlatpickrInstance = () => {
      mergedOptions.onClose = mergedOptions.onClose || (() => {
        if (nodeRef.current?.blur) nodeRef.current.blur();
      });

      flatpickrRef.current = flatpickr(nodeRef.current as HTMLElement, mergedOptions);

      if (flatpickrRef.current && value !== undefined) {
        flatpickrRef.current.setDate(value, false);
      }

      if (defaultProps.onCreate) defaultProps.onCreate(flatpickrRef.current);
    };

    const destroyFlatpickrInstance = () => {
      if (defaultProps.onDestroy) defaultProps.onDestroy(flatpickrRef.current);
      if (flatpickrRef.current) {
        flatpickrRef.current.destroy();
      }
      flatpickrRef.current = null;
    };

    createFlatpickrInstance();

    if (flatpickrRef.current) {
      const optionsKeys = Object.getOwnPropertyNames(mergedOptions);
      for (let index = optionsKeys.length - 1; index >= 0; index--) {
        const key = optionsKeys[index];
        let optionValue = mergedOptions[key as keyof OptionsType];

        if (optionValue?.toString() !== flatpickrRef.current.config[key as keyof ParsedOptions]?.toString()) {
          if (hooks.includes(key as any) && !Array.isArray(optionValue)) {
            optionValue = [optionValue] as unknown as Plugin;
          }

          flatpickrRef.current.set(key as any, optionValue);
        }
      }

      if (value !== undefined && value !== flatpickrRef.current.input.value) {
        flatpickrRef.current.setDate(value as DateOption | DateOption[], false);
      }
    }

    return () => {
      destroyFlatpickrInstance();
    };
  }, [mergedOptions, options, props, value, defaultProps]);

  const handleNodeChange = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
  }, []);

  if (render) {
    return render({...props, defaultValue, value}, handleNodeChange);
  }

  return options.wrap ? (
    <div {...props} ref={handleNodeChange}>
      {children}
    </div>
  ) : (
    <input
      value={value?.toString()}
      onChange={onChange}
      className={className}
      defaultValue={defaultValue}
      ref={handleNodeChange}
    />
  );
};

export default DateTimePicker;
