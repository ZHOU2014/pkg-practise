const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
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

    genLibIndex();
})

function genLibIndex () {
    const libIndexJsVar = [];

    Object.keys(webpackConfig.entry).forEach((mName) => {
        const oPackageName = mName.replace('-', '');
        const packageName = oPackageName.charAt(0).toUpperCase() + oPackageName.substring(1);
        libIndexJsVar.push(packageName);
    });

    const importVar = [];

    libIndexJsVar.forEach((lib) => {
        importVar.push(`import ${lib} from './${lib}/index.js';\n`);
    });

    const exportVar = `export { ${libIndexJsVar.join(', ')} };\nexport default { ${libIndexJsVar.join(', ')} };`;
    const installCode = `
const component = [${Object.keys(webpackConfig.entry).join(', ')}];\n
component.forEach((item) => {
    item.install = (Vue) => {
        Vue.component(item.name, item);
    }
})\n`;

    const libIndexFile = importVar.join('') + installCode + exportVar;
    
    fs.writeFile(path.resolve(__dirname, 'packages', 'comm-design-vue', 'lib', 'index.js'), libIndexFile, {
        encoding: 'utf8'
    }, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('lib的index.js文件生成成功');
    })
}