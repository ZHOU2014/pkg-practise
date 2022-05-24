const webpack = require('webpack');
const webpackConfig =  require('./build.config');

const compiler = webpack(webpackConfig);

const handler = (percentage, message, ...args) => {
    console.info((Math.floor(percentage * 100)) + '%', message, ...args);
};
  
const p = new webpack.ProgressPlugin(handler);

p.apply(compiler);

compiler.run((err, stats) => {
    if (err) {
        console.error(err)
    }

    console.log(stats.toString({
        color: true
    }));
})