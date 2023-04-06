const path = require("path");

module.exports = {
  mode: "production",
  entry: "./lib/index.js",
  experiments: {
    outputModule: true,
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    library: {
      type: "module",
    },
  },
  module: {
    rules: [
      {
        test: /.m?js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map'
};
