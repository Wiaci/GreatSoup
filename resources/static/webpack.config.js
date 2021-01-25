const packageJSON = require('./package.json');
const path = require('path');
const webpack = require('webpack');
module.exports = {
	devtool: 'source-map',
	entry: './index.js',
	output: {
		path: path.join(__dirname, '.'),
		filename: 'app-bundle.js'},
	resolve: {extensions: ['.js', '.jsx', '.css']},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "./components"),
		compress: true,
		port: 9090,
		noInfo: false,
		quiet: false,
		lazy: false,
		watchOptions: {
			poll: true
		}
	}
}