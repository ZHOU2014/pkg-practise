import { exec } from 'child_process'
import inquirer from 'inquirer'
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import uppercamelcase from 'uppercamelcase';
import jsonTemplater from 'json-templater';
import parser from '@babel/parser';
import traverser from '@babel/traverse';
import t from '@babel/types';
import generator from "@babel/generator";
const __dirname = path.resolve();
const render = jsonTemplater.object;
const parse = parser.parse;
const traverse = traverser.default;
const generate = generator.default;

inquirer.prompt([{type: 'input', name: 'name', message: '请输入组件名称', validate(input) {
    const done = this.async();
    input = String(input).trim();
    if (!input) {
        return done('请输入组件名称');
    }

    const spinner = ora('正在检查包名是否存在').start();

    exec(`npm search ${input}`, (err, stdout) => {
        spinner.stop();

        if (err) {
            done('检查包名是否存在失败，请重试');
        } else {
            if (/No matches/.test(stdout)) {
                done(null, true)
            } else {
                done('该包名已存在，请修改');
            }
        }
    });
}}]).then((answers) => {
    create(answers.name);
}).catch((err) => {
    console.error(err);
});


function create (name) {
    const packageDir = path.join(__dirname, 'packages', name);
    const srcDir = path.join(packageDir, 'src');
    const templateDir = path.join(__dirname, 'template');

    fs.ensureDirSync(packageDir);
    fs.ensureDirSync(srcDir);

    fs.copySync(path.join(templateDir, 'index.js'), path.join(packageDir, 'index.js'));
    fs.copySync(path.join(templateDir, 'style.less'), path.join(packageDir, 'style.less'));

    renderTemplateAndCreate('package.json', {name: name}, packageDir);
    renderTemplateAndCreate('index.vue', {name: uppercamelcase(name)}, packageDir);

    updateEnhanceApp(name);

    function renderTemplateAndCreate (file, data, dest) {
        const originalText = fs.readFileSync(path.join(templateDir, file), {encoding: 'utf-8'});
        const transfterText = render(originalText, data);
        fs.writeFileSync(path.join(dest, file), transfterText, {encoding: 'utf-8'});
    }
}

function updateEnhanceApp (name) {
    const filePath = path.join(__dirname, 'docs', '.vuepress', 'enhanceApp.js');
    const fileCode = fs.readFileSync(filePath, {encoding: 'utf-8'});
    const ast = parse(fileCode, {sourceType: 'module'});

    traverse(ast, {
        Program(path, state) {
            const bodyList = path.get('body');
            let lastImportIndex = -1;
            bodyList.forEach((item, index) => {
                if (t.isImportDeclaration(item)) {
                    lastImportIndex = index;
                }
            });
            const newImportDeclaration = t.importDeclaration(
                [t.importDefaultSpecifier(t.identifier(uppercamelcase(name)))],
                t.stringLiteral(name)
            );

            if (lastImportIndex === -1) {
                let firstPath = path.get('body.0');
                firstPath.insertBefore(newImportDeclaration)
            } else {
                let lastPath = path.get(`body.${lastImportIndex}`);
                lastPath.insertAfter(newImportDeclaration)
            }
        },
        ExportDefaultDeclaration (path, state) {
            let bodyNodeList = path.node.declaration.body.body;

            let lastIndex = -1;
            bodyNodeList.forEach((item, index) => {
                if (
                    t.isExpressionStatement(item) &&
                    t.isCallExpression(item.expression) &&
                    t.isMemberExpression(item.expression.callee) &&
                    t.isIdentifier(item.expression.callee.object) &&
                    t.isIdentifier(item.expression.callee.property) &&
                    item.expression.callee.object.name === 'Vue' &&
                    item.expression.callee.property.name === 'use') {
                    lastIndex = index;
                }
            });

            const newVueUse = t.expressionStatement(
                t.callExpression(
                    t.memberExpression(
                        t.identifier('Vue'),
                        t.identifier('use')
                    ),
                    [
                        t.identifier(uppercamelcase(name)) 
                    ]
                )
            );

            if (lastIndex === -1) {
                if (bodyList.length > 0) {
                    let firstPath = path.get('declaration.body.body.0');
                    firstPath.insertBefore(newVueUse)
                } else {
                    let bodyPath = path.get('declaration.body');
                    bodyPath.pushContainer('body', newVueUse);
                }
            } else {
                let lastPath = path.get(`declaration.body.body.${lastIndex}`);
                lastPath.insertAfter(newVueUse);
            }
        }
    });

    const result = generate(ast);
    console.log(result.code);

    fs.writeFileSync(path.join(__dirname, 'docs', '.vuepress', 'enhanceApp.js'), result.code, {encoding: 'utf-8'});
}

