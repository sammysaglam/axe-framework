const path              = require('path');
const webpack           = require('webpack');
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AotPlugin         = require('@ngtools/webpack').AotPlugin;
const isProduction      = process.argv.indexOf('-p') !== -1;

const plugins = [
	      new webpack.optimize.CommonsChunkPlugin({
		      name    :"angular" ,
		      filename:"../../Website/views/libs/angular_bundle.js"
	      }) ,
	      new ExtractTextPlugin("[name].css") ,
	      new webpack.DefinePlugin({
		      'process.env':{
			      isProduction:isProduction
		      }
	      })
      ]
;
if ( isProduction ) {
	plugins.push(new UglifyJSPlugin({
			compress:true ,
			comments:false
		}) ,
		new AotPlugin({
			tsConfigPath:'./tsconfig.json' ,
			entryModule :path.resolve(__dirname , "src/app") + '/app.module#AppModule'
		})
	);
}

module.exports = {

	entry:{
		angular      :[
			//"@angular/common" ,
			//"@angular/compiler" ,
			//"@angular/core" ,
			//"@angular/platform-browser" ,
			"@angular/forms" ,
			"@angular/platform-browser-dynamic" ,
			"reflect-metadata" ,
			//"rxjs" ,
			"zone.js"
		] ,
		angular_app:['./src/main.ts' , './src/styles.scss']
	} ,

	output:{
		path    :path.resolve('../') ,
		filename:"[name].js"
	} ,

	resolve:{
		extensions:['.ts' , '.js' , '.json' , '.css' , '.scss' , '.html']
	} ,

	module :{
		loaders:[
			{test:/\.(sass|scss)$/ , loader:ExtractTextPlugin.extract(['css-loader' , 'sass-loader']) , exclude:path.resolve(__dirname , "src/app")} ,
			(
				isProduction ?
					{test:/\.ts$/ , loaders:['@ngtools/webpack']}
					:
					{test:/\.(ts|js)$/ , loader:['awesome-typescript-loader' , 'angular2-template-loader'] , exclude:/node_modules/}
			) ,
			{test:/\.(sass|scss)$/ , loader:['raw-loader' , 'sass-loader'] , include:path.resolve(__dirname , "src/app")} ,
			{test:/\.html$/ , loader:'raw-loader' , exclude:/node_modules/}
		]
	} ,
	plugins:plugins
};