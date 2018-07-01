const Path = require('path')
const Webpack = require('webpack')

module.exports = {
    entry: Path.join(__dirname, 'src/index.tsx'),
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
        path: Path.join(__dirname, '../../dist/Client/JavaScript'),
        publicPath: '/JavaScript/'
    },
    devServer: {
        contentBase: Path.join(__dirname, '../../dist/Client'),
        historyApiFallback: true,
        publicPath: 'http://localhost:8080/JavaScript'
    },
    plugins: [
        new Webpack.NamedModulesPlugin()
    ]
}