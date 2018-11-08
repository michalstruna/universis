const Path = require('path')
const Webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // TODO: Only in debug mode.

module.exports = {
    entry: Path.join(__dirname, 'src/index.tsx'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /\.s?css$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json',
            '.scss'
        ]
    },
    output: {
        filename: 'index.min.js',
        path: Path.join(__dirname, '../Public/JavaScript'),
        publicPath: '/JavaScript/'
    },
    devServer: {
        contentBase: Path.join(__dirname, '../Public'),
        historyApiFallback: true,
        hot: true,
        inline: true,
        host: 'localhost',
        port: 8080,
        publicPath: 'http://localhost:8080/JavaScript'
    },
    plugins: [
        new Webpack.NamedModulesPlugin(),
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        //new BundleAnalyzerPlugin() // TODO: Only debug.
    ]
}