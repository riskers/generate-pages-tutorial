var path = require('path')
var ROOT = path.resolve(__dirname)
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractCSS = new ExtractTextPlugin('[name].css')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
var CDN = process.env.CDN

module.exports = {
	entry: {
		'page1/main': ROOT + '/src/page1/main',
		'page2/main': ROOT + '/src/page2/main'
	},
	output: {
		filename: '[name].js',
		path: ROOT + '/dist',
		publicPath: CDN ? CDN : '/dist'
	},
	devServer: {
		proxy: {
			'*': {
				target: 'http://localhost:8000'
			}
		}
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
				test: /.php$/,
				loader: 'raw'
			}
		]
	},
	externals: {
		jQuery: 'window.jQuery'
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
			filename: ROOT + '/pages/html/page1.php',
			template: ROOT + '/pages/tpl/page1.php',
			chunks: ['common', 'page1/main']
		}),
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			filename: ROOT + '/pages/html/page2.php',
			template: ROOT + '/pages/tpl/page2.php',
			chunks: ['common', 'page2/main']
		}),
		new HtmlWebpackHarddiskPlugin(),
		new webpack.optimize.CommonsChunkPlugin('common','common.js'),
		new webpack.ProvidePlugin({
			$: 'jQuery'
		})
	]
}