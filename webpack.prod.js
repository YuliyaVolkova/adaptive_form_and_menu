const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  output: { 
     publicPath: '/adaptiv_forma_end_menu/',
  },

  plugins: [
      new UglifyJSPlugin({sourceMap: true,
      					compress: true,
      				}),
      new CopyWebpackPlugin([
    { from: 'assets/images/sprites/', to: 'assets/images/sprites/' },
    { from: 'app/vendors/', to: 'app/vendors/'},
      ]),
     new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
     }),
     new CleanWebpackPlugin(['build']),
     new HtmlWebpackPlugin({
       title: 'Меню и форма поиска',
       template: './views/index.pug',
       chunks: ['index'],
       filename: './index.html'
      }),
   	new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]
});