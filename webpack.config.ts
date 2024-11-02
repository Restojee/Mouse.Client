import type { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import webpack from "webpack";

module.exports = () => {
  const config: Configuration = {
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.(css|sass|scss)$/,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[local]--[hash:base64:5]',
                },
              },
            },
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
      alias: {
        '@common': path.resolve(__dirname, 'src/common'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@ui': path.resolve(__dirname, 'src/common/components'),
      },
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    // @ts-ignore
    devServer: {
      historyApiFallback: true,
      static: path.join(__dirname, 'public'),
      compress: true,
      /* port: environments.PORT, */
      port: 3000,
      open: true,
      hot: true,
      liveReload: true,
    },
    plugins: [
      /*
        new Dotenv({
          path: './.env',
          safe: true
        }),
      */
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
  };

  return config;
};
