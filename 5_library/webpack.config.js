var path = require('path')
var ROOT = path.resolve(__dirname)
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractCSS = new ExtractTextPlugin('[name].css')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

module.exports = {
	entry: {
		'page1/main': ROOT + '/src/page1/main',
		'page2/main': ROOT + '/src/page2/main'
	},
	output: {
		filename: '[name].js',
		path: ROOT + '/dist',
		publicPath: '/dist'
	},
	module: {
		loaders: [
			{
			    test: /\.js$/,
			    loader: "babel",
			    exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: extractCSS.extract('style', 'css')
			},
			{
				test: /.html$/,
				loader: 'raw'
			}
		]
	},
	resolve: {
		alias: {
			pages: ROOT + '/pages'
		}
	},
	plugins: [
		extractCSS,
		new webpack.DefinePlugin({
			'ENV': JSON.stringify(process.env.ENV)
		}),
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			filename: ROOT + '/pages/html/page1.html',
			template: ROOT + '/pages/tpl/page1.html',
			chunks: ['page1/main']
		}),
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			filename: ROOT + '/pages/html/page2.html',
			template: ROOT + '/pages/tpl/page2.html',
			chunks: ['page2/main']
		}),
		new HtmlWebpackHarddiskPlugin(),
	]
}