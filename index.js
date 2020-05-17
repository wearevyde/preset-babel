const { declare } = require('@babel/helper-plugin-utils');

const presetEnv = [
  '@babel/preset-env',
  {
    spec: true,
    useBuiltIns: 'usage',
    corejs: 3,
  },
];

const sharedPresets = [presetEnv];
const sharedPlugins = [
  require('@babel/plugin-syntax-dynamic-import'),
  require('@babel/plugin-proposal-class-properties'),
  require('@babel/plugin-proposal-nullish-coalescing-operator'),
];

const frontendCrossEnvPlugins = [
  require('babel-plugin-styled-components'),
  require('@babel/plugin-transform-react-jsx'),
];

const frontendProductionPlugins = [
  require('babel-plugin-transform-react-remove-prop-types'),
  require('babel-plugin-jsx-remove-data-test-id'),
];

const frontend = (plugins, isFrontend) => {
  return isFrontend ? plugins : [];
};

const defaultOpts = {
  cacheUsing: () => process.env.NODE_ENV,
  frontend: false,
  typescript: false,
  fastRefresh: false,
};

module.exports = declare((api, opts) => {
  opts = Object.assign(defaultOpts, opts);

  api.assertVersion(7);
  api.cache.using(opts.cacheUsing);

  const config = {
    presets: [...sharedPresets, require('@babel/preset-react')],
    plugins: [
      ...sharedPlugins,
      ...frontend(frontendCrossEnvPlugins, opts.frontend),
    ],
    env: {
      production: {
        plugins: [
          ...frontend(frontendProductionPlugins, opts.frontend),
          require('babel-plugin-remove-debug'),
        ],
      },
      development: {
        plugins: opts.fastRefresh ? [require('react-refresh/babel')] : [],
      },
      test: {
        plugins: [require('babel-plugin-dynamic-import-node')],
      },
    },
  };

  if (opts.typescript) {
    config.plugins.push(require('@babel/preset-typescript'));
  }

  return config;
});
