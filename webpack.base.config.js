const webpack = require('webpack');

module.exports = function(e) {
  const env = e || 'dev';
  const isDev = env === 'dev';
  const plugins = [];
  if (!isDev) {
    plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }));
    // plugins.push(new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: true
    //   }
    // }));
  }

  const conf = {
    entry: './app/main.js',

    output: {
      path: isDev ? './dev' : './dist',
      publicPath: '/',
      filename: 'main.js'
    },

    debug: true,

    resolve: {
      extensions: ['', '.js', '.jsx', '.scss']
    },

    // externals: [
    //  /^react(\/.*)?$/,
    //  /^reflux(\/.*)?$/,
    //  "superagent"
    // ],
    //
    plugins: plugins,

    module: {
      loaders: [
        {
          test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2|otf)$/,
          loader: 'url-loader?limit=10000'
        },

        {
          test: /\.(js|jsx)$/,
          loader: 'react-hot-loader!babel?cacheDirectory=true&presets[]=react,presets[]=es2015,presets[]=react',
          exclude: /(node_modules|bower_components)/
        },

        {
          test: /\.(scss|css)$/,
          loader: 'style-loader!css-loader!sass-loader'
        }
      ]
    }
  };

  return conf;
};
