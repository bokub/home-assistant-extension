const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const version = require('./package.json').version;

module.exports = (env, argv) => {
  const browser = env.browser || 'chrome';
  return {
    entry: {
      popup: './src/popup/popup.js',
      options: './src/options/index.js',
      background: './src/background.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist', browser),
    },
    plugins: [
      new CleanWebpackPlugin(), // Clean dist folder
      new VueLoaderPlugin(), // Handle Vue files
      new CopyPlugin({
        patterns: [
          { context: 'assets', from: '**/*.{png,html}', to: '.' }, // Copy assets
          {
            context: 'assets',
            from: `manifest.${browser}.json`,
            to: 'manifest.json',
            transform: (c) => c.toString().replace('%version%', version),
          },
        ],
      }),
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
        // Handle special comments: /* rm-<browser> */
        {
          test: /\.js$/,
          loader: 'string-replace-loader',
          options: {
            search: new RegExp(`^.+\\* rm-${browser} \\*.+$`, 'gm'),
            replace: '',
          },
        },
      ],
    },
    devtool: argv.mode === 'development' ? 'inline-source-map' : false, // Prevents chrome errors in dev mode
  };
};
