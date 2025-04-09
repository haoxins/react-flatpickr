"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const vite_1 = require("vite");
const packageJSON = require('./package.json');
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    build: {
        lib: {
            entry: (0, path_1.resolve)(__dirname, 'lib/index.js'),
            name: packageJSON.name,
            formats: ['cjs', 'es'],
        },
        outDir: 'build',
        rollupOptions: {
            external: [
                ...Object.keys(packageJSON.dependencies),
                ...Object.keys(packageJSON.peerDependencies),
                'react/jsx-runtime',
            ],
        },
    },
});
