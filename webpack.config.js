const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname),
                exclude: /(node_modules)|(dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer :{
        port : 3000,
        hot : true
    },
    plugins: [ new CleanWebpackPlugin(),
               new HtmlWebpackPlugin(), 
               new webpack.HotModuleReplacementPlugin() 
    ],

    //출처: https://ibrahimovic.tistory.com/47 [Web Standard]
};