const path = require('path');

module.exports = {
	entry: "./app/assets/scripts/app.js",
	output: {
		path: path.resolve(__dirname, './app/assets/scripts/bundled'),
		filename: "app.js"
	},

	module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}