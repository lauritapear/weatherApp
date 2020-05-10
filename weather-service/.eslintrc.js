module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
      project: './tsconfig.json'
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended'
    ],
    settings: {
      /* react: {
          version: 'detect'
        } */
    },
    env: {
      browser: false,
      node: true,
      es6: true
    },
    plugins: ['@typescript-eslint'],
    parserOptions: {
      ecmaFeatures: {
        jsx: false
      },
      ecmaVersion: 2019, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module' // Allows for the use of imports
    },
    rules: {
      'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      'no-inner-declarations': 'off',
      'arrow-parens': 'off'
    },
    overrides: [
      // Override some TypeScript rules just for .js files
      {
        files: ['*.js'],
        rules: {
          '@typescript-eslint/no-var-requires': 'off' //
        }
      }
    ]
  };