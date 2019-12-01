const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  entry: {
    background: path.resolve(__dirname, 'src/background/index'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
