module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@babel/eslint-parser', // Или '@typescript-eslint/parser', если используете TypeScript
        ecmaVersion: 2021,
        sourceType: 'module',
        requireConfigFile: false, // Для Babel
    },
    plugins: [
        'vue',
    ],
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
    },
    rules: {
        'no-undef': 'off', // Отключить правило 'no-undef' для устранения ошибок с 'defineProps' и 'defineEmits'
        'vue/no-undef-components': 'off', // Временно отключить проверку на неопределённые компоненты Vuetify
    },
}
