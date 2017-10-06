const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProduction = process.argv.indexOf('-p') !== -1;
const glob = require("glob");

const themes = glob.sync('node_modules/axe-editable-content/dist/themes/*.css' , {ignore:'node_modules/axe-editable-content/dist/themes/*.min.css'}).map(fileName => fileName.replace(/(.+\/)|(\.css)/g , ''));

const themeExtractors = themes.map(themeName => new ExtractTextPlugin({
	filename:function(getPath) {
		return getPath("themes/" + themeName + (isProduction ? '.min' : '') + ".css");
	}
}));

const extractCSS = new ExtractTextPlugin({
	filename:function(getPath) {
		return getPath("[name]" + (isProduction ? '.min' : '') + ".css");
	}
});

const plugins = [
	new webpack.optimize.CommonsChunkPlugin({
		name    :"react_draft_jquery" ,
		filename:"../../../views/libs/react_draft_jquery_bundle" + (isProduction ? '.min' : '') + ".js"
	}) ,
	...themeExtractors ,
	extractCSS
];

if ( isProduction ) {
	plugins.push(new UglifyJSPlugin({
		compress:true ,
		comments:false
	}));
}
const outputFilename = !isProduction ? '[name].js' : '[name].min.js';

module.exports = {
	entry  :{
		react_draft_jquery:["react" , "react-dom" , "draft-js" , "draft-convert" , "jquery"] ,
		editable_content  :[
			'./src/entry.js' ,
			'./src/entry.scss' ,
			...(themes.map(themeName => 'axe-editable-content/dist/themes/' + themeName + '.css'))
		]
	} ,
	output :{
		path    :path.resolve('../') ,
		filename:outputFilename
	} ,
	module :{
		rules:[
			{test:/\.(jpg|png|svg)$/ , loader:'url-loader'} ,
			...(themes.map((themeName , index) => ({test:new RegExp(themeName + "\.(css|scss)$") , loader:themeExtractors[index].extract(['css-loader' , 'sass-loader'])}))) ,
			{test:/entry\.scss$/ , loader:extractCSS.extract(['css-loader' , 'sass-loader'])} ,
			{test:/\.(js|jsx)$/ , loader:'babel-loader'}
		]
	} ,
	plugins:plugins
}