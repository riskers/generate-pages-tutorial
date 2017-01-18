var path = require('path')
var ROOT = path.resolve(__dirname)

module.exports = {
	entry: {
		'page1/main': ROOT + '/src/page1/main',
		'page2/main': ROOT + '/src/page2/main'
	},
	output: {
		filename: '[name].js',
		path: ROOT + '/dist'
	}
}