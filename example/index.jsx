import React, {useState, useRef, useCallback, useMemo} from 'react';
import {createRoot} from 'react-dom/client';

import Flatpickr from '../lib/index.js';

import 'flatpickr/dist/themes/material_green.css';
import './index.css';

// Date string in the format YYYY-MM-DD for last week
const lastWeek = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0];

const App = () => {
  const calendarRef = useRef(null);
  const value = useMemo(() => '2016-01-01 01:01', []);
  const onChange = useCallback((_, str) => {
    console.info(str);
  }, []);
  const [range, setRange] = useState([new Date()]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [handler, setHandler] = useState(() => (dates) => {
    console.log('initial handler', dates);
  });

  const sharedOptions = useMemo(
    () => ({
      enableTime: true
    }),
    []
  );

  const onStartChange = useCallback((date) => {
    setStartDate(date);
  }, []);

  const onEndChange = useCallback((date) => {
    setEndDate(date);
  }, []);

  return (
    <main>
      <div className="flatpickr-container">
        <div className="title">
          Log onChange with <a href="https://flatpickr.js.org/examples/#datetime">time enabled</a>
        </div>
        <Flatpickr
          className="test"
          onChange={[
            (_, str) => {
              console.info('First prop handler', str);
            },
            (_, str) => {
              console.info('Second prop handler', str);
            }
          ]}
          options={{
            ...sharedOptions,
            onChange: [
              (_, str) => {
                console.info('First options handler', str);
              },
              (_, str) => {
                console.info('Second options handler', str);
              }
            ]
          }}
        />
      </div>
      <div className="flatpickr-container">
        <div className="title">
          Default value,&nbsp;
          <a href="https://flatpickr.js.org/examples/#datetime" target="_blank">
            time enabled
          </a>
          , and modify&nbsp;
          <a href="https://flatpickr.js.org/events/#onchange" target="_blank">
            <code>onChange</code>
          </a>
          &nbsp; handler
        </div>
        <Flatpickr defaultValue="2016-11-11 11:11" onChange={handler} options={sharedOptions} />
        <button
          type="button"
          onClick={() => {
            setHandler(() => (dates) => {
              console.log('new handler', dates);
            });
          }}
        >
          Change handler
        </button>
      </div>
      <div className="flatpickr-container">
        <div className="title">Enabled time</div>
        <Flatpickr value={value} onChange={(_, str) => console.info(str)} options={sharedOptions} />
      </div>
      <div className="flatpickr-container">
        <div className="title">
          <a href="https://flatpickr.js.org/examples/#mindate-and-maxdate" target="_blank">
            Set minDate
          </a>
          &nbsp; of last week
        </div>
        <Flatpickr value={value} options={{minDate: lastWeek}} onChange={(_, str) => console.info(str)} />
      </div>
      <div className="flatpickr-container">
        <div className="title">
          <a href="https://flatpickr.js.org/examples/#range-calendar" target="_blank">
            Set mode to range
          </a>
        </div>
        <Flatpickr
          value={range}
          options={{mode: 'range'}}
          onChange={(dates, str) => {
            setRange(dates);
            console.info('range changed', dates, str);
          }}
        />
      </div>
      <div className="flatpickr-container">
        <div className="title">
          <a href="https://flatpickr.js.org/examples/#mindate-and-maxdate" target="_blank">
            Set maxDate
          </a>
          &nbsp; to today, log in&nbsp;
          <a href="https://github.com/haoxins/react-flatpickr#onopen-function">
            prop <code>onOpen</code>
          </a>
          , log in&nbsp;
          <a href="https://flatpickr.js.org/events/#onclose" target="_blank">
            option's <code>onClose</code>
          </a>
        </div>
        <Flatpickr
          onChange={onChange}
          onOpen={() => {
            console.info('opened (by prop)');
          }}
          options={{
            onClose: () => {
              console.info('closed (by option)');
            },
            maxDate: new Date()
          }}
        />
      </div>
      <div className="flatpickr-container">
        <div className="title">
          <a href="https://flatpickr.js.org/examples/#preloading-a-date" taget="_blank">
            Preloading the date
          </a>
          &nbsp; to today
        </div>
        <Flatpickr value={new Date()} onChange={(_, str) => console.info(str)} />
      </div>
      <div className="flatpickr-container">
        <div className="title">
          <a href="https://flatpickr.js.org/examples/#flatpickr--external-elements" target="_blank">
            External elements
          </a>
        </div>
        <Flatpickr value={value} options={{wrap: true}} onChange={(_, str) => console.info(str)}>
          <input type="text" data-input />
          <button type="button" data-toggle>
            Toggle
          </button>
          <button type="button" data-clear>
            Clear
          </button>
        </Flatpickr>
      </div>
      <div className="flatpickr-container">
        <Flatpickr
          defaultValue="2019-05-05"
          onCreate={(flatpickr) => {
            calendarRef.current = flatpickr;
          }}
          onDestroy={() => {
            calendarRef.current = null;
          }}
          render={({defaultValue}, ref) => {
            return (
              <div>
                <input defaultValue={defaultValue} ref={ref} />
                <button onClick={() => calendarRef.current?.setDate(new Date())}>Today</button>
              </div>
            );
          }}
        />
      </div>
      <div className="flatpickr-container">
        <div className="title">
          Shared with&nbsp;
          <a href="https://github.com/haoxins/react-flatpickr#classname" target="_blank">
            custom class name
          </a>
        </div>
        <Flatpickr value={startDate} options={sharedOptions} onChange={onStartChange} className="custom-class" />
        <Flatpickr
          value={endDate}
          options={sharedOptions}
          className="custom-class margin-left"
          onChange={onEndChange}
        />

        <dl>
          <dt>Start</dt>
          <dd>{startDate?.toString()}</dd>
          <dt>End</dt>
          <dd>{endDate?.toString()}</dd>
        </dl>
      </div>
    </main>
  );
};

window.init = () => {
  createRoot(document.querySelector('#container')).render(<App />);
};
