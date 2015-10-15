module.exports = function(env) {
	env = env || 'dev';
	var isDev = env === 'dev';

	var conf = {
		entry: isDev ? ['webpack/hot/dev-server', './app/main.jsx'] : './app/main.jsx',

		output: {
			path: './dist',
			filename: 'main.js'
		},

		resolve: {
	    extensions: ['', '.js', '.jsx', '.scss']
	  },

		externals: [
			/^react(\/.*)?$/,
			/^reflux(\/.*)?$/,
			"superagent"
		],

		plugins: [new webpack.PrefetchPlugin("react")],

		module: {
			loaders: [
				{
					test: /\.(png|jpg|jpeg|gif|svg)$/,
					loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
				},

				{
					test: /\.jsx$/,
					loader: ["react-hot-loader", "babel-loader?stage=0"],
					exclude: /(node_modules|bower_components)/
				},

				{
					test: /\.scss$/,
					loader: 'style-loader!css-loader?module' + (isDev ? '' : '&localIdentName=[path][name]---[local]---[hash:base64:5]') + '!sass-loader'
				},

				{
					test: /\.html/,
					loader: 'html-loader'
				}
			]
		}
	};
};
