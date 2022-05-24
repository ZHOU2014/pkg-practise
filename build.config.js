const path = require('path');
const glob = require('glob');
const { VueLoaderPlugin } = require('vue-loader')

const allEntries = glob.sync(path.resolve(__dirname, 'packages/*', 'index.js'));
const entry = {};
const entryReg = /\/packages\/([a-zA-Z0-9_-]+)\/index.js/;

allEntries.forEach((e) => {
    const packageNameR = e.match(entryReg);
    if (packageNameR) {
        entry[packageNameR[1]] = e;
    }
});

module.exports = {
    entry: entry,
    mode: 'production',
    externals: ['vue'],
    output: {
        filename: '[name]/lib/index.js',
        path: path.resolve(__dirname, 'packages'),
        library: {
            name: '[name]',
            type: 'umd',
            export: 'default'
        }
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
