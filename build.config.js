const path = require('path');
const glob = require('glob');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const allEntries = glob.sync(path.resolve(__dirname, 'packages', 'comm-design-vue', 'src/*', 'index.js'));
const entry = {};
const entryReg = /\/packages\/comm-design-vue\/src\/([a-zA-Z0-9_-]+)\/index.js/;

console.log(allEntries);

allEntries.forEach((e) => {
    const packageNameR = e.match(entryReg);
    if (packageNameR) {
        entry[packageNameR[1]] = e;
    }
});

const commonCssLoader = ['css-loader', 'postcss-loader'];
const plugins = [new VueLoaderPlugin()];

if (process.env.NODE_ENV === 'production') {
    commonCssLoader.unshift(MiniCssExtractPlugin.loader);
    plugins.push(
        new MiniCssExtractPlugin({
            filename: "lib/[name]/style.css",
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
        filename: 'lib/[name]/index.js',
        path: path.resolve(__dirname, 'packages', 'comm-design-vue'),
        library: {
            name: '[name]',
            type: 'umd',
            export: 'default'
        },
        assetModuleFilename: (dataPath) => {
            const filePath = dataPath.module.resourceResolveData.relativePath.match(/\.\/src\/([a-zA-Z0-9_-]+)\//);
            return `lib/${filePath[1]}/[name][ext][query]`;
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
                        exclude: /node_modules/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        exclude: /node_modules/,
                        use: [...commonCssLoader, 'less-loader']
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
                ],
                exclude: /node_modules/,
                
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
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
