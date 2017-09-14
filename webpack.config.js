const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    'js/app': './resources/assets/js/app.js',
    'js/post': './resources/assets/js/post.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|gif|jpg|svg|jpeg)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether'
    }),
    new ExtractTextPlugin({
      filename: '/css/app.css',
      allChunks: true
    })
  ]
}
