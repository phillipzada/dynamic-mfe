const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const { resolve } = require('path');

module.exports = {
  entry: {
    // CONFIGURING FOR SYSTEMJS FIRST
    react_app2_sjs: 'systemjs-webpack-interop/auto-public-path',
  },
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3003,
    hot: false,
    liveReload: false,
  },
  output: {
    // CONFIGURING FOR SYSTEMJS FIRST
    path: resolve(__dirname, 'dist'),
    publicPath: 'auto',
    libraryTarget: 'system',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    // MODULE FEDERATION CONFIGURATION
    new ModuleFederationPlugin({
      name: 'react_app2_wbf',
      library: { type: 'var', name: 'react_app2_wbf' },
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    // SYSTEM JS CONFIGURATION
    new ModuleFederationPlugin({
      name: 'react_app2_sjs',
      library: { type: 'system', name: 'react_app2_sjs' },
      filename: 'remoteEntry-sjs.js',
      exposes: {
        './App': './src/App',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

