module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	output: {
		filename: "bundle.js"
	}
};
