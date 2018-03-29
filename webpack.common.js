const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.jsx'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      App: path.resolve(__dirname, 'src/'),
      Controllers: path.resolve(__dirname, 'src/controllers'),
      Components: path.resolve(__dirname, 'src/components'),
      Utility: path.resolve(__dirname, 'src/utility')
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test:  /\.(js|jsx)$/,
        exclude: ['node_modules', 'data'],
        loader: 'eslint-loader',
        query: {
          fix: true
        }
      },
      {
        test: /\.js/,
        exclude: ['node_modules', 'data'],
        loader: 'babel-loader',
        query: {
          presets: [
            'latest',
            /*['env', {modules: false}],*/
            'react'
          ],
          plugins: [
            ['transform-object-rest-spread'],
            ['transform-decorators-legacy']
          ]
        }
      },
      {
        test: /\.(css|scss)$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.eot$|\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.txt$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]",
      }
    ]
  }
};