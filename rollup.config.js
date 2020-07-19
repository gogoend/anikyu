import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './src/anikyu.js',
  output: [{
    file: `./dist/anikyu.js`,
    name: `Anikyu`,
    format: 'umd'
  },
  {
    file: `./dist/anikyu.esm.js`,
    format: 'es'
  }],
  plugins: [
    commonjs({
      extensions: ['.js'],
      ignoreGlobal: false,
      sourceMap: false,
    }),
    resolve({
      browser:true
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};