const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
        {
            enforce: 'pre',
            test: /\.ts$/,
            loader: 'tslint-loader',
            exclude: /(node_modules)/,
            options: {
                configFile: 'tslint.json'
            }
        },
        {
            test: /\.ts$/,
            exclude: /node_modules|vue\/src/,
            loader: 'ts-loader',
            options: {
                appendTsSuffixTo: [/\.vue$/],
                transpileOnly: true,
                isolatedModules: true
            }
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    ts: 'ts-loader!tslint-loader'
                }
            }
        }]
    }
}