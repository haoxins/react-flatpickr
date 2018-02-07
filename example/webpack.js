
'use strict'

const path = require('path')

module.exports = {
  entry: {
    index: path.join(__dirname, 'index.tsx'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
  },

  output: {
    path: path.join(__dirname),
    filename: 'example.js'
  },

  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
  },

  module: {
    loaders: [{
      test: /\.tsx?/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },

  devtool: 'source-map'
}
