import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
    {
        languageOptions: { globals: globals.browser },
    },
    pluginJs.configs.recommended,
    eslintPluginPrettier,
];
