const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.argv.indexOf('-p') !== -1;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLMinifier = require('html-minifier');
const jsonminify = require('jsonminify');

const plugins = [
	new CleanWebpackPlugin('build',{root:path.resolve('../')}) ,
	new ExtractTextPlugin("style.css") ,
	new CopyWebpackPlugin([{
		from:{glob:'**/*.+(html|php|png|svg|jpg|jpeg|json)'} ,
		context:'src' ,
		to:'[path]/[name].[ext]' ,
		transform:(fileContents , path) => {

			// do not process fileContents if dev mode
			if ( !isProduction ) return fileContents;

			// get file extension
			const file_ext = path.split('.').pop().toLowerCase();

			// minify HTML
			switch (file_ext) {
				case "html":
					return HTMLMinifier.minify(fileContents.toString() , {
						collapseWhitespace:true ,
						collapseInlineTagWhitespace:true ,
						minifyCSS:true ,
						minifyJS:true ,
						removeComments:true ,
						removeRedundantAttributes:true
					});
				case "json":
					return jsonminify(fileContents.toString());

				default:
					return fileContents;

			}

		}
	}] , {
		ignore:[
			{glob:'**/_*/*'} ,
			{glob:'**/_*'}
		]
	})
];
if ( isProduction ) {
	plugins.push(new UglifyJSPlugin({
		compress:true ,
		comments:false
	}));
}

module.exports = {
	entry:{
		bundle:['./src/entry.js' , './src/entry.scss']
	} ,
	output:{
		path:path.resolve('../build') ,
		filename:'[name].js'
	} ,
	module:{
		rules:[
			{test:/\.(jpg|png|svg)$/ , loader:'url-loader'} ,
			{test:/\.(js|jsx)$/ , loader:(isProduction ? ['babel-loader' , 'eslint-loader'] : ['babel-loader'])} ,
			{test:/\.(scss)$/ , loader:ExtractTextPlugin.extract(['css-loader' , 'sass-loader'])}
		]
	} ,
	plugins:plugins
};