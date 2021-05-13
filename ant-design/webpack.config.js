const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'ant.js',
    path: path.resolve(__dirname, 'dist'),
  },
};