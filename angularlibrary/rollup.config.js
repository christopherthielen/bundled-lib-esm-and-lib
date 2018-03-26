import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'lib/index.js',
  output: {
    name: 'angularlibrary',
    file: '_bundles/angularlibrary.js',
    sourcemap: true,
    format: 'umd',
    exports: 'named',
    globals: {
      'vanillajslibrary': 'vanillajslibrary',
      '@angular/core': 'ng.core',
      '@angular/common': 'ng.common',
    },
  },
  plugins: [
    nodeResolve({ jsnext: true }),
    sourcemaps(),
    commonjs(),
  ],
  external: [
    '@angular/core',
    '@angular/common',
    'vanillajslibrary'
  ],
};
