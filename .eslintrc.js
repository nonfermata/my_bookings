module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        // Отступ, кол-во пробелов
        indent: ["error", 4],
        "multiline-ternary": ["error", "always-multiline"],

        // Точка с запятой в конце строки
        semi: [2, "always"],

        // Пробел при обозночении функции
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],

        // Использование двойных кавычек
        quotes: ["error", "double", { allowTemplateLiterals: true }]
    }
};
