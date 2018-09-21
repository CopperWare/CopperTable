const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/*const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");*/
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "production",
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"less-loader"
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "bundle.css"
		})/*,
		new UglifyJsPlugin(),
		new CompressionPlugin({
			deleteOriginalAssets: true
		})*/
	]
});
