const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
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
                exclude: /(node_modules|bower_components|gemini|gemini-report|gemini-coverage)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
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
        new ExtractTextPlugin({filename: 'style.css', allChunks: true}),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': 'production'
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compressor: {
        //         warnings: false
        //     }
        // })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9000,
        inline: true
    }
};
