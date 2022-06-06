import { exec } from 'child_process'
import inquirer from 'inquirer'
import ora from 'ora'

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
    console.log(answers);
}).catch((err) => {
    console.error(err);
});
