import React, {Ref} from 'react';
import {jest, expect, describe, it} from '@jest/globals';
import {fireEvent, render} from '@testing-library/react';
import DateTimePicker from '../lib';
import {Instance} from 'flatpickr/dist/types/instance';

describe('react-flatpickr', () => {
  it('shows an empty input', () => {
    const {unmount, container} = render(<DateTimePicker />);
    const input = container.querySelector('input');
    expect(input?.value).toBe('');
    unmount();
  });

  describe('#value', () => {
    describe('is in the YYYY-MM-DD format', () => {
      it('shows it in the input', () => {
        const {unmount, container} = render(<DateTimePicker value="2000-01-01" />);
        const input = container.querySelector('input');
        expect(input?.value).toBe('2000-01-01');
        unmount();
      });
    });

    describe('is in the YYYY.MM.DD format', () => {
      it('normalizes it and shows in the input', () => {
        const {unmount, container} = render(<DateTimePicker value="2000.01.01" />);
        const input = container.querySelector('input');
        expect(input?.value).toBe('2000-01-01');
        unmount();
      });
    });

    describe('is updated with a minDate', () => {
      it('updates the minDate first', () => {
        const {unmount, rerender, container} = render(
          <DateTimePicker value="2000-01-01" options={{minDate: '2000-01-01'}} />
        );
        const input = container.querySelector('input');
        expect(input?.value).toBe('2000-01-01');
        rerender(<DateTimePicker value="1999-01-01" options={{minDate: '1999-01-01'}} />);
        expect(input?.value).toBe('1999-01-01');
        unmount();
      });
    });
  });

  describe('#render', () => {
    it('is possible to provide a custom input', () => {
      function MaskedInput({defaultValue, innerRef}: {defaultValue: any; innerRef: Ref<HTMLInputElement> | undefined}) {
        return <input defaultValue={defaultValue} ref={innerRef} />;
      }

      const {unmount, container} = render(
        <DateTimePicker
          defaultValue="2000-01-01"
          render={({defaultValue}, ref) => {
            return (
              <div>
                <MaskedInput defaultValue={defaultValue} innerRef={ref} />
                <span>bar</span>
              </div>
            );
          }}
        />
      );
      const input = container.querySelector('input');
      const span = container.querySelector('span');
      expect(input?.value).toEqual('2000-01-01');
      expect(span).toBeDefined();
      unmount();
    });
  });

  describe('#onCreate', () => {
    it('is called when the flatpickr instance is created', () => {
      const spy = jest.fn();
      const {unmount} = render(<DateTimePicker onCreate={spy} />);
      expect(spy).toHaveBeenCalled();
      unmount();
    });

    it('is possible to reference the flatpickr instance', () => {
      let calendar: Instance | null | undefined;
      const {unmount, container} = render(
        <DateTimePicker
          defaultValue="2000-01-01"
          onCreate={(flatpickr) => {
            calendar = flatpickr;
          }}
          render={({defaultValue}, ref) => {
            return (
              <div>
                <input defaultValue={defaultValue} ref={ref} />
                <button
                  onClick={() => {
                    calendar?.setDate('1000-01-01');
                  }}
                >
                  foo
                </button>
              </div>
            );
          }}
        />
      );
      const input = container.querySelector('input');
      expect(input?.value).toEqual('2000-01-01');
      const button = container.querySelector('button') as HTMLButtonElement;
      fireEvent.click(button);
      expect(input?.value).toEqual('1000-01-01');
      unmount();
    });
  });

  describe('#onDestroy', () => {
    it('is called when the flatpickr instance is destroyed', () => {
      const spy = jest.fn();
      const {unmount} = render(<DateTimePicker onDestroy={spy} />);
      unmount();
      expect(spy).toHaveBeenCalled();
    });
  });
});
