module.exports = {
    entry: './dist/index.js',
    output: {
        filename: './modules/simpler-mapper.bundle.js',
        sourceMapFilename: './modules/simpler-mapper.bundle.js.map'
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    configFileName: 'tsconfig.json'
                }
            }
        ]
    }
};