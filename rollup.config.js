import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

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
    babel({
      exclude: 'node_modules/**'
    }),
    uglify({}, minify)
  ]
};