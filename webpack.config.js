const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const version = require('./package.json').version;
const options = {
  entry: {
    popup: './src/popup/popup.js',
    options: './src/options/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean dist folder
    new VueLoaderPlugin(), // Handle Vue files
    new CopyPlugin({
      patterns: [
        { context: 'assets', from: '**/*.{png,html}', to: '.' },
        {
          context: 'assets',
          from: 'manifest.json',
          to: '.',
          transform: (c) => c.toString().replace('%version%', version),
        },
      ],
    }), // Copy assets
    new MiniCssExtractPlugin(), // Extract CSS to separate file
  ],
  module: {
    rules: [
      // SASS/SCSS files
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          { loader: 'sass-loader', options: { implementation: require('sass') } },
        ],
      },
      // Vue files
      { test: /\.vue$/, loader: 'vue-loader' },
    ],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    options.devtool = 'inline-source-map'; // Prevents chrome errors in dev mode
  }
  return options;
};
