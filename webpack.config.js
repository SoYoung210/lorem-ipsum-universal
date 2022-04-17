/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');

module.exports = (env, argv) => {
  return {
    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
        watch: true,
      },
      port: 9000,
    },
    entry: {
      ui: './src/ui.tsx',
      code: './src/code.ts',
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: 'commonjs',
                    targets: {
                      esmodules: true,
                    },
                  },
                ],
                ['@babel/preset-react'],
                ['@babel/preset-typescript'],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.svg/,
          type: 'asset/inline',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },

    optimization: env.WEBPACK_SERVE
      ? {
          runtimeChunk: 'single',
        }
      : undefined,

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: env.WEBPACK_SERVE ? '/' : undefined,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/ui.html',
        filename: 'ui.html',
        inlineSource: '.(js)$',
        chunks: ['ui'],
        inject: 'body',
        cache: 'false',
      }),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
    ],
  };
};
