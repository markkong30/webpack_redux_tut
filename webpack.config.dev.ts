const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
	mode: 'development',
	target: 'web',
	devtool: 'cheap-module-source-map',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		stats: 'minimal',
		overlay: true,
		historyApiFallback: true,
		disableHostCheck: true,
		headers: { 'Access-Control-Allow-Origin': '*' },
		https: false
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			favicon: 'src/favicon.ico'
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader']
			},
			{
				test: /\.(ts|tsx)$/,
				use: ['ts-loader', 'eslint-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', 'jsx']
	}
};