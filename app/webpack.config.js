const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../.env` });

const isProd = (process.env.NODE_ENV === 'production');
const entry = isProd ? ['babel-polyfill', './app/src/index.jsx'] : ['babel-polyfill', 'webpack-dev-server/client?http://localhost:3000', './app/src/index.jsx'];

module.exports = {
  devtool: 'eval',
  entry,
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
