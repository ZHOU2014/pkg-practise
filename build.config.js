const path = require('path');
const glob = require('glob');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const allEntries = glob.sync(path.resolve(__dirname, 'packages/*', 'index.js'));
const entry = {};
const entryReg = /\/packages\/([a-zA-Z0-9_-]+)\/index.js/;

allEntries.forEach((e) => {
    const packageNameR = e.match(entryReg);
    if (packageNameR) {
        entry[packageNameR[1]] = e;
    }
});

const commonCssLoader = ['css-loader', 'postcss-loader'];
const plugins = [new VueLoaderPlugin()];

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    commonCssLoader.unshift(MiniCssExtractPlugin.loader);
    plugins.push(
        new MiniCssExtractPlugin({
            filename: "[name]/lib/style.css",
        })
    )
} else {
    commonCssLoader.unshift('style-loader');
}

module.exports = {
    entry: entry,
    mode: 'production',
    externals: ['vue', 'axios'],
    output: {
        filename: '[name]/lib/index.js',
        path: path.resolve(__dirname, 'packages'),
        library: {
            name: '[name]',
            type: 'umd',
            export: 'default'
        },
        assetModuleFilename: (dataPath) => {
            const packageName = dataPath.module.resourceResolveData.descriptionFileData.name;
            return `${packageName}/lib/[hash][ext][query]`
        }
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader, 'less-loader']
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb
                    }
                }
            }
        ]
    },
    plugins: plugins
};
