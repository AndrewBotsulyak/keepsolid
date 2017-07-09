let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');

module.exports = {
	entry:"./src/main.js",
	output:{
		path:__dirname + "/dist/build/",
		publicPath: "./",
		filename: "bundle.js"
	},

	watch:true,
    
    plugins: [
            new ExtractTextPlugin('bundle.css')
        ],

	module:{
		rules:[
			{
                test: /\.(js|jsx)$/,
			    exclude: [/node_modules/, /dist/],
			    loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use:ExtractTextPlugin.extract({fallback: "style-loader", use:["css-loader", "sass-loader"]}),
                exclude: [/node_modules/, /dist/]
            },
            {
                test: /\.css$/,
                use:ExtractTextPlugin.extract({fallback:"style-loader" , use:["css-loader" ,'autoprefixer-loader'] }),
                exclude: [/node_modules/, /dist/]
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                 test: /\.(jpe?g|png|gif|svg|jpg)$/i,
                loader: "url-loader?limit=1&mimetype=image/png&name=/images/[hash].[ext]"
            },
            {
              test: /\.html$/,
              loader: 'html-loader?attrs[]=video:src'
            }, {
              test: /\.mp4$/,
              loader: 'file'
            }
		]
	}
}