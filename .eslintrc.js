module.exports = {
    "env": {
        "browser": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-unused-var":  ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
    }
}
