import sass from 'rollup-plugin-sass'
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss'
import styles from "rollup-plugin-styles";
import svgr from "@svgr/rollup";
import css from "rollup-plugin-import-css";

import preserveDirectives from "rollup-plugin-preserve-directives";

import pkg from './package.json'

// export default {
//   input: 'src/index.tsx',
//   output: [
//     {
//       file: pkg.main,
//       format: 'es',
//       // format: 'cjs',
//       exports: 'named',
//       // sourcemap: true,
//       sourcemap: false,
//       strict: false,
//       banner: 'import "./index.css"'
//     }
//   ],
//   plugins: [ /* sass({ insert: true }), styles(), */ css({ output: 'index.css' }),
//   svgr({ exportType: 'named', jsxRuntime: 'classic' }), typescript(), resolve(), commonjs(/* {
//     include: [/node_modules/]
//   } */)],
//   external: ['react', 'react-dom']
// }


export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      // format: 'es',
      format: 'cjs',
      exports: 'named',
      // sourcemap: true,
      sourcemap: true,
      strict: false,
      // banner: 'import "./index.css"'
    }
  ],
  plugins: [ sass({ insert: true }), styles(), /* css({ output: 'index.css' }), */
  svgr({ exportType: 'named', jsxRuntime: 'classic' }), typescript(), resolve(), commonjs(/* {
    include: [/node_modules/]
  } */)],
  external: ['react', 'react-dom']
}

