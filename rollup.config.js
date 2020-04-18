import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify-es';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './src/anikyu.js',
  output: [{
    file: `./dist/anikyu.js`,
    name: `Anikyu`,
    format: 'umd'
  },{
    file: `./dist/anikyu.esm.js`,
    format: 'es'
  }],
  plugins: [
    resolve(),
    commonjs({
      extensions: [ '.js' ],
      ignoreGlobal: false,
      sourceMap: false,
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    uglify()
  ]
};