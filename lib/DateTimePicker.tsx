import React, {useEffect, useRef, FC, useMemo, useCallback, useImperativeHandle, ChangeEventHandler} from 'react';
import flatpickr from 'flatpickr';
import {Options, DateOption, Plugin, ParsedOptions} from 'flatpickr/dist/types/options';
import {DateTimePickerProps} from '../types/react-flatpickr';
import type {OptionsType} from '../types/react-flatpickr';

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
        (inputOptions as any)[hook].push(...propHook);
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

export const DateTimePicker: FC<DateTimePickerProps> = (defaultProps) => {
  const props = useMemo(() => ({...defaultProps}), [defaultProps]);
  const {defaultValue, options = {}, value, children, render, onCreate, onDestroy} = props;
  const mergedOptions = useMemo(() => mergeHooks(options, props), [options, props]);
  const nodeRef = useRef<HTMLElement | null>(null);
  const flatpickrRef = useRef<flatpickr.Instance>(undefined);

  useImperativeHandle(
    defaultProps.ref,
    () => {
      return {
        get flatpickr() {
          return flatpickrRef.current;
        }
      };
    },
    []
  );

  useEffect(() => {
    const createFlatpickrInstance = () => {
      mergedOptions.onClose =
        mergedOptions.onClose ||
        (() => {
          if (nodeRef.current?.blur) nodeRef.current.blur();
        });

      // @ts-expect-error for some reason the default import isnt working correctly
      flatpickrRef.current = (flatpickr?.default || flatpickr)(nodeRef.current as HTMLElement, mergedOptions);

      onCreate?.(flatpickrRef.current);
    };

    const destroyFlatpickrInstance = () => {
      onDestroy?.(flatpickrRef.current);
      if (flatpickrRef.current) {
        flatpickrRef.current.destroy();
      }
      flatpickrRef.current = undefined;
    };

    createFlatpickrInstance();

    return () => {
      destroyFlatpickrInstance();
    };
  }, [mergedOptions, onCreate, onDestroy]);

  useEffect(() => {
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
  }, [mergedOptions, value]);

  const handleNodeChange = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
  }, []);

  if (render) {
    return render({...props, defaultValue, value}, handleNodeChange);
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (defaultProps && defaultProps.onChange) {
        if (Array.isArray(defaultProps?.onChange)) {
          defaultProps?.onChange?.forEach(() => [new Date(e.target.value)], value?.toString() || '');
        } else if (typeof defaultProps.onChange === 'function') {
          defaultProps?.onChange?.([new Date(e.target.value)], value?.toString() || '', flatpickrRef.current!);
        }
      }
    },
    [defaultProps, value]
  );

  return options.wrap ? (
    <div className="flatpickr" ref={handleNodeChange}>
      {children}
    </div>
  ) : (
    <input
      // @ts-expect-error just allow all the passed props to be passed to the input
      onChange={onChange}
      {...props}
      value={value?.toString()}
      defaultValue={defaultValue}
      ref={handleNodeChange}
    />
  );
};
