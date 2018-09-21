const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	devServer: {
		contentBase: "./dist",
		hot: true,
		open: true,
		overlay: true,
		port: 3000,
		host: "0.0.0.0",
		useLocalIp: true,
		compress: true
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					"style-loader",
					"css-loader",
					"less-loader"
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
});
