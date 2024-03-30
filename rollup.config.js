import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import svgr from "@svgr/rollup";
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import clear from 'rollup-plugin-clear';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      name: 'DOMParserWidget',
      format: 'iife',
      exports: 'named',
      strict: false,
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
      },
      compact: true,
    }
  ],
  plugins: [
    svgr({ exportType: 'named', jsxRuntime: 'classic' }),
    typescript({
      compilerOptions: {
        declaration: false,
      }
    }),
    resolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    postcss({
      plugins: []
    }),
    terser(),
    // clear({
    //   targets: ['./dist']
    // }),
  ],
}
