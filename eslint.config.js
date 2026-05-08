module.exports = [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                browser: 'readonly',
                console: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',
                Buffer: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
            'no-trailing-spaces': 'error',
            'eol-last': 'error'
        },
        ignores: [
            'node_modules/**',
            'tests_output/**',
            'config/html-reporter/**',
            '*.min.js'
        ]
    }
];