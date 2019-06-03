const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  },

  devServer: {
    contentBase: path.resolve(__dirname, "./public/"),
    hot: true,
    compress: true,
    port: 3000,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "loaders")
    ]
  },
  module: {
    rules: [
      {
        test: /\.html?$/,
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "public")
        ],
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "new-loader",
            options: {
              hashLength: 8
            }
          }
        ]
      },
      {
        test: /\.(jpe?g)|(png)$/,
        loader: "url-loader?limit=8192&name=[name]-[hash].[ext]",
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "public")
        ]
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
