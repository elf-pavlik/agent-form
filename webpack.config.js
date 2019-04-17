const path = require('path')

module.exports = {
  entry: ['./bootstrap.ts', './app-shell.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@polymer/lit-element': 'lit-element' // caused by issue in mwc-base
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true
        }
      }
    ]
  },
  devServer: {
    contentBase: '.',
    watchContentBase: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}
