var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './index.js',
    output: {
        path: './dist/',
        filename: 'ux-collector.js'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css-loader!less-loader?sourceMap', {publicPath: './'})
            }, // use ! to chain loaders
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader?sourceMap', {publicPath: './'})
            },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
    },
    plugins: [
        //分离出CSS
        new ExtractTextPlugin("ux-collector.css", {
            allChunks: true
        })
    ]
};