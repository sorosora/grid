import babel from 'rollup-plugin-babel'

const globals = {
  react: 'React',
  'styled-components': 'styled',
};

const external = [
  'react',
  'styled-components',
];

const plugins = [
  babel({
    plugins: ['@babel/plugin-external-helpers']
  })
];

export default [
  {
    input: './lib/index.js',
    external,
    globals,
    plugins,
    output: {
      file: 'dist/grid.js',
      format: 'umd'
    },
  },
  {
    input: './lib/withViewport.js',
    external,
    globals,
    plugins,
    output: {
      file: 'dist/withViewport.js',
      format: 'umd'
    },
  }
]
