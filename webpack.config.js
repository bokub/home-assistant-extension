const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const options = {
  entry: {
    popup: './src/popup/popup.js',
    options: './src/options/options.js',
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { context: 'src', from: '**/*.{png,json}', to: '.' }, // Keep structure
        { context: 'src', from: '**/*.html', to: '[name][ext]' }, // Flatten
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          { loader: 'sass-loader', options: { implementation: require('sass') } },
        ],
      },
      { test: /\.vue$/, loader: 'vue-loader' },
    ],
  },
};

if (process.env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-eval-source-map';
}

module.exports = options;
