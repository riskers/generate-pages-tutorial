var path = require('path')
var ROOT = path.resolve(__dirname)
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		'page1/main': ROOT + '/src/page1/main',
		'page2/main': ROOT + '/src/page2/main',
		'page3/main': ROOT + '/src/page3/main',
		'page4/main': ROOT + '/src/page4/main'
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
			}
		]
	},
	postcss: function() {
		return [autoprefixer]
	}
}