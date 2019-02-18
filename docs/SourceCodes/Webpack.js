{
    entry: './src/index.js',
    output: { filename: 'index.min.js' },
    module: {
        rules: [
            { test: /\.tsx?$/, use: ['ts-loader', 'babel-loader'] }
        ]
    }
}
