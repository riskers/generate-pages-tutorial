var path = require('path')
var ROOT = path.resolve(__dirname)
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractCSS = new ExtractTextPlugin('[name].css')

module.exports = {
	entry: {
		'page1/main': ROOT + '/src/page1/main',
		'page2/main': ROOT + '/src/page2/main',
		'page3/main': ROOT + '/src/page3/main',
		'page4/main': ROOT + '/src/page4/main',
		'page5/main': ROOT + '/src/page5/main'
	},
	output: {
		filename: '[name].js',
		path: ROOT + '/dist'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				include: ROOT + '/src/page1',
				loaders: ['style', 'css']
			},
			{
				test: /\.less$/,
				loaders: ['style', 'css', 'less']
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			},
			{
				test: /\.css$/,
				include: ROOT + '/src/page4',
				loaders: ['style', 'css', 'postcss']
			},
			{
				test: /\.css$/,
				include: ROOT + '/src/page5',
				loader: extractCSS.extract('style', 'css')
			}
		]
	},
	postcss: function() {
		return [autoprefixer]
	},
	plugins: [
		extractCSS
	]
}