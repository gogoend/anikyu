import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import json from '@rollup/plugin-json';

let publicPlugins = [
  json()
]

let babelPlugins = [
  commonjs({
    extensions: ['.js'],
    ignoreGlobal: false,
    sourceMap: false,
  }),
  resolve({
    browser: true
  }),
  babel({
    exclude: 'node_modules/**'
  })
]

export default [
  {
    input: './src/anikyu.js',
    output: {
      file: `./dist/anikyu.js`,
      name: `Anikyu`,
      format: 'umd',
    },
    plugins: [
      ...publicPlugins,
      ...babelPlugins
    ]
  },
  {
    input: './src/anikyu.js',
    output: {
      file: `./dist/anikyu.min.js`,
      name: `Anikyu`,
      format: 'umd',
    },
    plugins: [
      ...publicPlugins,
      ...babelPlugins,
      terser()
    ]
  },
  {
    input: './src/anikyu.js',
    output: [{
      file: `./dist/anikyu.esm.js`,
      format: 'es',
    }, {
      file: `./dist/anikyu.esm.min.js`,
      format: 'es',
      plugins: [
        terser()
      ]
    }],
    plugins:[
      ...publicPlugins
    ]
  }
]
