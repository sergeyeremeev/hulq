const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './app'),
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, './dist/assets/'),
        publicPath: 'assets',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename: 'style.css', allChunks: true})
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9000,
        inline: true
    }
};