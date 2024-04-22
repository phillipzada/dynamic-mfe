const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const config = withModuleFederationPlugin({
  name: 'angular_app3',

  exposes: {
    './Entry': './src/app/remote-entry/entry.main.ts',
    './Component': './src/app/remote-entry/entry.component.ts',
  },

  library: {
    name: 'angular_app3',
    type: 'var',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});

config.output.scriptType = 'text/javascript';
config.optimization.runtimeChunk = false;
config.output.uniqueName = 'angular_app3';

module.exports = config;
