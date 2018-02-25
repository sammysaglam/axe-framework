const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLMinifier = require('html-minifier');
const jsonminify = require('jsonminify');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const copyHotLoaderFiles = new CopyWebpackPlugin([
	{
		from: { glob: '**/*.+(html|json|png|svg|jpg|jpeg|gif|ttf|woff|eot)' },
		context: 'src/hot-loader',
		to: './[path]/[name].[ext]'
	}
], {
	ignore: [
		{ glob: '**/_*/**' },
		{ glob: '**/_*' }
	]
});

const copyFiles = new CopyWebpackPlugin([
	{
		from: { glob: '**/*.+(html|php|json|png|svg|jpg|jpeg|gif|ttf|woff|eot)' },
		context: 'src',
		to: './[path]/[name].[ext]',
		transform: (fileContents, filepath) => {

			// get file extension
			const fileExt = filepath.split('.').pop().toLowerCase();

			// minify HTML
			switch (fileExt) {
				case 'html':
					return HTMLMinifier.minify(fileContents.toString(), {
						collapseWhitespace: true,
						collapseInlineTagWhitespace: true,
						minifyCSS: true,
						minifyJS: true,
						removeComments: true,
						removeRedundantAttributes: true
					});
				case 'json':
					return jsonminify(fileContents.toString());

				default:
					return fileContents;

			}

		}
	}
], {
	ignore: [
		{ glob: '**/_*/**' },
		{ glob: '**/_*' },
		{ glob: 'hot-loader/*' }
	]
});

const extractCssGenerator = isHotLoaderEnv => new ExtractTextPlugin({
	filename(getPath) {
		return getPath('[name].css');
	},
	...(isHotLoaderEnv ? { disable: true } : {})
});

module.exports = env => {

	const analyzeBuild = env && env.analyze;
	const isHotLoaderEnv = env && env.hot;
	const extractCss = extractCssGenerator(isHotLoaderEnv);

	return {
		...(isHotLoaderEnv ? { devtool: 'source-map' } : {}),
		entry: {
			'bundle': isHotLoaderEnv ?
				[
					'babel-polyfill',
					'react-hot-loader/patch',
					'./src/entry',
					'./src/entry.scss'
				] :
				[
					'./src/entry',
					'./src/entry.scss'
				]
		},
		devServer: {
			hotOnly: true,
			contentBase: path.join(__dirname, 'build'),
			compress: true,
			port: 9155,
			host: 'localhost',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
			}
		},
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].js',
			publicPath: 'http://localhost:9155/'
		},
		plugins: [
			extractCss,
			copyFiles,
			...(isHotLoaderEnv ? [
				copyHotLoaderFiles
			] : [
				new ImageminPlugin(),
				new CleanWebpackPlugin('build'),
				new OptimizeCssAssetsPlugin({
					assetNameRegExp: /\.(scss|css)$/g
				}),
				new UglifyJSPlugin({
					uglifyOptions: {
						compress: true,
						output: {
							comments: false
						}
					}
				}),
				...(analyzeBuild ? [
					new BundleAnalyzerPlugin()
				] : [])
			]),
			new webpack.DefinePlugin({
				AXE_DEV: true
			})
		],
		module: {
			rules: [
				{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
				{ test: /\.md/, exclude: /node_modules/, loader: ['babel-loader', 'axe-markdown-loader'] },
				{
					test: /\.(png|svg|jpg|jpeg|gif|ttf|woff|eot)$/,
					loader: 'url-loader'
				},
				{
					test: /\.(scss)$/,
					loader: extractCss.extract({
						use: [
							{
								loader: 'css-loader',
								options: {
									root: './'
								}
							},
							'sass-loader'
						],
						fallback: 'style-loader'
					}),
					exclude: /themes/
				}
			]
		},
		resolve: {
			alias: {
				'react': path.resolve('node_modules/react'),
				'react-dom': path.resolve('node_modules/react-dom'),
				'prop-types$': path.join(__dirname, 'node_modules/axe-prop-types')
			}
		}
	};
};
