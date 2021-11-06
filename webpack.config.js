const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './app'),
    open: true,
    hot: true,
    port: 8080,
    watchContentBase: true,
  },
  mode: "development",
  watch: true,
  watchOptions: {
    ignored: ['**/node_modules', '**/public', '**/src'],
  },

  /*  mode: "production",/!**!/*/
  entry: [
   path.resolve(__dirname, './app/index.js')
  ],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: './index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './app/index.html'),
      filename: 'index.html',
      minify: false
    }),
    new MiniCssExtractPlugin({
      filename: "./[name].css"
    }),
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        },

      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './'
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ],
  },
}
