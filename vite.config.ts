import {resolve} from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import {defineConfig} from 'vite';

const packageJSON = require('./package.json');

export default defineConfig({
  plugins: [dts({rollupTypes: true}), react()],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: packageJSON.name,
      formats: ['cjs', 'es'],
    },
    outDir: 'build',
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        'react',
        'react-dom',
        ...Object.keys(packageJSON.dependencies),
        ...Object.keys(packageJSON.peerDependencies),
        'react/jsx-runtime',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
