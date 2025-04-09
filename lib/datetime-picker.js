"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimePicker = void 0;
const react_1 = __importStar(require("react"));
const flatpickr_1 = __importDefault(require("flatpickr"));
const callbacks = ['onCreate', 'onDestroy'];
const hooks = [
    'onChange',
    'onOpen',
    'onClose',
    'onMonthChange',
    'onYearChange',
    'onReady',
    'onValueUpdate',
    'onDayCreate'
];
const mergeHooks = (inputOptions, props) => {
    hooks.forEach((hook) => {
        if (props[hook]) {
            if (inputOptions[hook] && !Array.isArray(inputOptions[hook])) {
                inputOptions[hook] = [inputOptions[hook]];
            }
            else if (!inputOptions[hook]) {
                inputOptions[hook] = [];
            }
            const propHook = Array.isArray(props[hook])
                ? props[hook]
                : [props[hook]];
            inputOptions[hook].push(...[propHook]);
        }
    });
    return inputOptions;
};
const DateTimePicker = (props) => {
    const { defaultValue, className, options = {}, value, children, render, onCreate, onDestroy, onChange } = props;
    const nodeRef = (0, react_1.useRef)(null);
    const flatpickrRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const createFlatpickrInstance = () => {
            let mergedOptions = Object.assign({ onClose: () => {
                    var _a;
                    if ((_a = nodeRef.current) === null || _a === void 0 ? void 0 : _a.blur)
                        nodeRef.current.blur();
                } }, options);
            if (!mergedOptions)
                return;
            mergedOptions = mergeHooks(mergedOptions, props);
            flatpickrRef.current = (0, flatpickr_1.default)(nodeRef.current, mergedOptions);
            if (value !== undefined) {
                flatpickrRef.current.setDate(value, false);
            }
            if (onCreate)
                onCreate(flatpickrRef.current);
        };
        const destroyFlatpickrInstance = () => {
            if (onDestroy)
                onDestroy(flatpickrRef.current);
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
    (0, react_1.useEffect)(() => {
        var _a;
        if (flatpickrRef.current) {
            const mergedOptions = mergeHooks(options, props);
            const optionsKeys = Object.getOwnPropertyNames(mergedOptions);
            for (let index = optionsKeys.length - 1; index >= 0; index--) {
                const key = optionsKeys[index];
                let optionValue = mergedOptions[key];
                if ((optionValue === null || optionValue === void 0 ? void 0 : optionValue.toString()) !== ((_a = flatpickrRef.current.config[key]) === null || _a === void 0 ? void 0 : _a.toString())) {
                    if (hooks.includes(key) && !Array.isArray(optionValue)) {
                        optionValue = [optionValue];
                    }
                    flatpickrRef.current.set(key, optionValue);
                }
            }
            if (value !== undefined && value !== flatpickrRef.current.input.value) {
                flatpickrRef.current.setDate(value, false);
            }
        }
    }, [options, value, props]);
    const handleNodeChange = (node) => {
        nodeRef.current = node;
    };
    hooks.forEach((hook) => {
        delete props[hook];
    });
    callbacks.forEach((callback) => {
        delete props[callback];
    });
    if (render) {
        return render(Object.assign(Object.assign({}, props), { defaultValue, value }), handleNodeChange);
    }
    return options.wrap ? (react_1.default.createElement("div", Object.assign({}, props, { ref: handleNodeChange }), children)) : (react_1.default.createElement("input", { value: value === null || value === void 0 ? void 0 : value.toString(), onChange: onChange, className: className, defaultValue: defaultValue, ref: handleNodeChange }));
};
exports.DateTimePicker = DateTimePicker;
