const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index",
  entry: {
    app: {
      import: "./src/index",
    },
  },
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: "auto",
    // publicPath: './dist',
  },

  resolve: {
    extensions: [".jsx", ".js", ".json", ".mjs"],
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
        options: {
          presets: [require.resolve("@babel/preset-react")],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host_react_module",
      filename: "remoteEntry.js",
      remotes: {
        // The following is when running remote at Vercel
        //remote_react_module: 'remote_react_module@https://remote-react-module.vercel.app/RemoteEntry.js',
        // The following is when running locally
        // remote_nextjs_module: 'remote_nextjs_module@http://localhost:8081/_next/static/chunks/remoteEntry.js',
        remote_react_module:
          "remote_react_module@http://localhost:9015/remoteEntry.js",
      },
      exposes: {},
      shared: {
        react: { singleton: true, requiredVersion: "18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "18.0.0" },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
