import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const packageJSON = require('./package.json')

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: packageJSON.name,
      formats: ['cjs', 'es'],
    },
    outDir: 'build',
    rollupOptions: {
      external: Object.keys(packageJSON.peerDependencies),
    },
  },
})
