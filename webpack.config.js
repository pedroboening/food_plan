const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    app: './client/src/index.jsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'client/dist'),
  },
  plugins: [
    new CleanWebpackPlugin(['client/dist']),
    new HtmlWebpackPlugin({
      title: 'IBM Forms',
      template: './client/src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader',
        ],
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader',
        ],
      },
    ],
  },
};

// preparation for prod
if (process.env.NODE_ENV === 'production') {
  // sourcemap
  config.devtool = undefined;
  config.mode = 'production';
  // plugins
  config
    .plugins
    .push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }));
  config
    .plugins
    .push(new UglifyJSPlugin({
      uglifyOptions: {
        warning: 'verbose',
        ecma: 6,
        beautify: false,
        compress: false,
        comments: false,
        mangle: false,
        toplevel: false,
        keep_classnames: true,
        keep_fnames: true,
      },
    }));
}

module.exports = config;
