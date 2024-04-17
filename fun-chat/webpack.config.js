const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin')

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            { test: /\.ts$/i, use: 'ts-loader' },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin(),
          new CssMinimizerPlugin(),
          new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
              removeAttributeQuotes: true,
              collapseWhitespace: true,
              removeComments: true,
            },
          }),
        ],
      },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        hot: true,
        open: true,
        historyApiFallback: true, // for SPA
      },
    resolve: {
        extensions: ['.ts','.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        clean: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({ extensions: 'ts' }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
