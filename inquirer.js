import inquirer from 'inquirer';

// inquirer.prompt([{
//     type: 'list',
//     name: 'preset',
//     message: 'Please pick a preset:',
//     choices: ['default(babel, eslint)', 'Manually select feature'],
//     filter: function (val) {
//         console.log(val);
//         return val.toLowerCase();
//     }
// }, {
//     type: 'checkbox',
//     name: 'feature',
//     message: 'Checkout the feature needed for you project:',
//     choices: [{
//         name: 'Babel',
//     }, {
//         name: 'Typescript',
//     }, {
//         name: 'Progressive Web App (PWA) Support',
//     }, {
//         name: 'Router',
//     }, {
//         name: 'Vuex',
//     }, {
//         name: 'CSS Pre-processors',
//     }, {
//         name: 'Linter / Formatter',
//     }, {
//         name: 'Unit Testing',
//     }, {
//         name: 'E2E Testing',
//     }],
//     pageSize: 9,
//     validate: function (answers) {
//         if (answers.length < 1) {
//             return 'You must choose at least one topping.'
//         }

//         return true;
//     }
// }]).then((answers) => {
//     console.log(JSON.stringify(answers, null, ''));
// }).catch((err) => {
//     console.error(err);
// });

function exitPreset () {
    inquirer.prompt([{
        type: 'list',
        name: 'preset',
        message: 'Please pick a preset:',
        choices: ['default(babel, eslint)', 'Manually select feature'],
        filter: function(val) {
            return val.toLowerCase();
        }
    }]).then((answers) => {
        if (answers.preset === 'manually select feature') {
            exitFeature();
        } else {
            console.log(JSON.stringify(answers, null, ''));
        }
    });
}

function exitFeature () {
    inquirer.prompt([{
        type: 'checkbox',
        name: 'feature',
        message: 'Checkout the feature needed for you project:',
        pageSize: 9,
        choices: [{
            name: 'Babel',
        }, {
            name: 'Typescript',
        }, {
            name: 'Progressive Web App (PWA) Support',
        }, {
            name: 'Router',
        }, {
            name: 'Vuex',
        }, {
            name: 'CSS Pre-processors',
        }, {
            name: 'Linter / Formatter',
        }, {
            name: 'Unit Testing',
        }, {
            name: 'E2E Testing',
        }],
        default: ['Babel', 'Linter / Formatter'],
        validate: function (answers) {
            if (answers.length < 1) {
                return 'you must choose at least one topping.'
            }
            return true;
        }
    }]).then((answers) => {
        console.log(JSON.stringify(answers, null, ''));
    });
}


function main () {
    exitPreset();
}

main();