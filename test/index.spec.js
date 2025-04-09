"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const globals_1 = require("@jest/globals");
const react_2 = require("@testing-library/react");
const lib_1 = __importDefault(require("../lib"));
(0, globals_1.describe)('react-flatpickr', () => {
    (0, globals_1.it)('shows an empty input', () => {
        const { unmount, container } = (0, react_2.render)(react_1.default.createElement(lib_1.default, null));
        const input = container.querySelector('input');
        (0, globals_1.expect)(input === null || input === void 0 ? void 0 : input.value).toBe('');
        unmount();
    });
    (0, globals_1.describe)('#value', () => {
        (0, globals_1.describe)('is in the YYYY-MM-DD format', () => {
            (0, globals_1.it)('shows it in the input', () => {
                const { unmount, container } = (0, react_2.render)(react_1.default.createElement(lib_1.default, { value: "2000-01-01" }));
                const input = container.querySelector('input');
                (0, globals_1.expect)(input === null || input === void 0 ? void 0 : input.value).toBe('2000-01-01');
                unmount();
            });
        });
        (0, globals_1.describe)('is in the YYYY.MM.DD format', () => {
            (0, globals_1.it)('normalizes it and shows in the input', () => {
                const { unmount, container } = (0, react_2.render)(react_1.default.createElement(lib_1.default, { value: "2000.01.01" }));
                const input = container.querySelector('input');
                (0, globals_1.expect)(input === null || input === void 0 ? void 0 : input.value).toBe('2000-01-01');
                unmount();
            });
        });
        (0, globals_1.describe)('is updated with a minDate', () => {
            (0, globals_1.it)('updates the minDate first', () => {
                const { unmount, rerender, container } = (0, react_2.render)(react_1.default.createElement(lib_1.default, { value: "2000-01-01", options: { minDate: '2000-01-01' } }));
                const input = container.querySelector('input');
                (0, globals_1.expect)(input === null || input === void 0 ? void 0 : input.value).toBe('2000-01-01');
                rerender(react_1.default.createElement(lib_1.default, { value: "1999-01-01", options: { minDate: '1999-01-01' } }));
                (0, globals_1.expect)(input === null || input === void 0 ? void 0 : input.value).toBe('1999-01-01');
                unmount();
            });
        });
    });
    (0, globals_1.describe)('#render', () => {
        (0, globals_1.it)('is possible to provide a custom input', () => {
            function MaskedInput({ defaultValue, innerRef }) {
                return react_1.default.createElement("input", { defaultValue: defaultValue, ref: innerRef });
            }
            const { unmount, container } = (0, react_2.render)(react_1.default.createElement(lib_1.default, { defaultValue: "2000-01-01", render: ({ defaultValue }, ref) => {
                    return (react_1.default.createElement("div", null,
                        react_1.default.createElement(MaskedInput, { defaultValue: defaultValue, innerRef: ref }),
                        react_1.default.createElement("span", null, "bar")));
                } }));
            const input = container.querySelector('input');
            const span = container.querySelector('span');
            (0, globals_1.expect)(input === null || input === void 0 ? void 0 : input.value).toEqual('2000-01-01');
            (0, globals_1.expect)(span).toBeDefined();
            unmount();
        });
    });
    (0, globals_1.describe)('#onCreate', () => {
        (0, globals_1.it)('is called when the flatpickr instance is created', () => {
            const spy = globals_1.jest.fn();
            const { unmount } = (0, react_2.render)(react_1.default.createElement(lib_1.default, { onCreate: spy }));
            (0, globals_1.expect)(spy).toHaveBeenCalled();
            unmount();
        });
        (0, globals_1.it)('is possible to reference the flatpickr instance', () => {
            let calendar;
            const { unmount, container } = (0, react_2.render)(react_1.default.createElement(lib_1.default, { defaultValue: "2000-01-01", onCreate: (flatpickr) => {
                    calendar = flatpickr;
                }, render: ({ defaultValue }, ref) => {
                    return (react_1.default.createElement("div", null,
                        react_1.default.createElement("input", { defaultValue: defaultValue, ref: ref }),
                        react_1.default.createElement("button", { onClick: () => {
                                calendar === null || calendar === void 0 ? void 0 : calendar.setDate('1000-01-01');
                            } }, "foo")));
                } }));
            const input = container.querySelector('input');
            (0, globals_1.expect)(input === null || input === void 0 ? void 0 : input.value).toEqual('2000-01-01');
            const button = container.querySelector('button');
            react_2.fireEvent.click(button);
            (0, globals_1.expect)(input === null || input === void 0 ? void 0 : input.value).toEqual('1000-01-01');
            unmount();
        });
    });
    (0, globals_1.describe)('#onDestroy', () => {
        (0, globals_1.it)('is called when the flatpickr instance is destroyed', () => {
            const spy = globals_1.jest.fn();
            const { unmount } = (0, react_2.render)(react_1.default.createElement(lib_1.default, { onDestroy: spy }));
            unmount();
            (0, globals_1.expect)(spy).toHaveBeenCalled();
        });
    });
});
