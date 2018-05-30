const Path = require('path')
const Webpack = require('webpack')

module.exports = {
    entry: Path.join(__dirname, 'index.ts'),
    module: {
        loaders: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules)/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
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
        path: Path.join(__dirname, 'Dist/JavaScript'),
        publicPath: '/js/'
    },
    devServer: {
        contentBase: Path.join(__dirname, 'Dist'),
        historyApiFallback: true,
        publicPath: 'http://localhost:8080/JavaScript'
    },
    plugins: [
        new Webpack.NamedModulesPlugin()
    ]
}