var path = require('path')

module.exports = {
	entry: entry,
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: CDN ? CDN : '/dist'
	},
	resolve: {
		alias: {
			'src': path.resolve(__dirname,'src'),
			'pages': path.resolve(__dirname,'pages')
		}
	},
	externals: {
		'd3': 'window.d3'
	},
	devServer: {
		proxy: {
			'/page4.html': {
				target: 'http://localhost:8000/page4.php'
			}
		}
	},
	module: {
		loaders: [
			{
				test: /\.css/,
				loader: ExtractTextPlugin.extract('style', 'css')
			},
			{
				test: /\.js$/,
				loader: "babel",
				exclude: /node_modules/
			},
			{
				test: /(\.html|\.php)$/,
      			loader: "raw-loader"
			}
		]
	},
	plugins: plugins.concat([
		new webpack.DefinePlugin({
			'ENV': JSON.stringify(process.env.ENV)
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),
		new ExtractTextPlugin('[name].css'),
		new webpack.ProvidePlugin({
			$: 'jquery'
		})
	])
}