const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

module.exports = merge(common, {

  devtool: 'inline-source-map',
  output: {
    publicPath: '/',
   },

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    inline: true,
    progress: true,
    historyApiFallback: true,
    host: HOST,
    port: PORT,
  },

   plugins: [
      new BrowserSyncPlugin(
      {
        host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8080/'
      },
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }),

      new CopyWebpackPlugin([
        { from: 'app/vendors/', to: 'app/vendors/'},
      ]),

      new HtmlWebpackPlugin({
       title: 'Меню и форма поиска',
       template: './views/index.pug',
       chunks: ['index'],
       filename: './index.html'
      }),
    ]
  });