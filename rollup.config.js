import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import svgr from "@svgr/rollup";
import css from "rollup-plugin-import-css";
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'es',
      exports: 'named',
      strict: false,
      banner: 'import "./index.css"'
    }
  ],
  plugins: [
    css({ output: 'index.css' }),
    svgr({ exportType: 'named', jsxRuntime: 'classic' }),
    typescript(),
    resolve(),
    commonjs(),
  ],
  external: ['react', 'react-dom']
}
