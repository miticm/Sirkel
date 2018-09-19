const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/App.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(png|jpg)$/i, use: "url-loader" }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    historyApiFallback: true
  }
};
