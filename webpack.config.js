const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: ['babel-polyfill', './src/index.jsx'],
	output: {
		filename: 'js/bundle.[hash].js',
		path: path.resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [
					path.resolve(__dirname, 'src')
				],
				use: [
					{ loader: 'babel-loader' },
					{ loader: 'eslint-loader' }
				]
			},
			{
				test: /\.(eot|woff2|woff|ttf|svg)$/,
				include: [
					path.resolve(__dirname, 'fonts')
				],
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: '../',
							name: 'fonts/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.scss$/,
				include: [
					path.resolve(__dirname, 'styles')
				],
				use: ExtractTextPlugin.extract({
					fallback: { loader: 'style-loader', options: { convertToAbsoluteUrls: false } },
					use: [
						{ loader: 'css-loader', options: { sourceMap: false } },
						{ loader: 'sass-loader', options: { sourceMap: false } }
					]
				})
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				include: [
					path.resolve(__dirname, 'images')
				],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'css/styles.[contenthash].css',
			disable: process.env.npm_lifecycle_event === 'start'
		}),
		new HtmlWebpackPlugin({
			template: 'index.ejs'
		})
	],
	devServer: {
		port: 5150,
		historyApiFallback: true,
	}
}