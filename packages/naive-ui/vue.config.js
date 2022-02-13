module.exports = {
    pages: {
        app: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    include: /node_modules/,
                    type: 'javascript/auto'
                },
            ]
        }
    }
}
