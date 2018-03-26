import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: 'lib-esm/index.js',
  output: {
    name: 'vanillajslibrary',
    file: '_bundles/vanillajslibrary.umd.js',
    sourcemap: true,
    format: 'umd',
    exports: 'named',
  },

  plugins: [
    nodeResolve({jsnext: true}),
    sourcemaps(),
  ],
};

