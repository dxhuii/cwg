module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: '@antfu',
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'import',
    'react'
  ],
  ignorePatterns: ['node_modules/*', 'dist/*', '*.yaml', '*.yml', '*.json', '*.md'],
  rules: {
    // we don't want it
    'semi': ['error', 'never'],

    // add parens ony when required in arrow function
    'arrow-parens': ['error', 'as-needed'],

    // add new line above comment
    // 'newline-before-return': 'error',

    // Allow multi line string
    'no-multi-str': 'off',

    // add new line above comment
    // 'lines-around-comment': [
    //   'error',
    //   {
    //     beforeBlockComment: true,
    //     beforeLineComment: true,
    //     allowBlockStart: true,
    //     allowClassStart: true,
    //     allowObjectStart: true,
    //     allowArrayStart: true,
    //   },
    // ],
    // 关闭组件命名规则
    'vue/multi-word-component-names': 'off',
    'vue/custom-event-name-casing': ['error', 'camelCase', {
      ignores: [
        '/^(click):[a-z]+[a-zA-Z]+$/'
      ]
    }],

    // Plugin: eslint-plugin-import
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',

    // 删除未尾逗号
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/comma-dangle': 'off',

    // JSX rules https://www.5axxw.com/wiki/content/0u8zli
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-child-element-spacing': 'error',
    'react/jsx-closing-bracket-location': ['error', 'after-props'],

    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-curly-newline': 'error',
    'react/jsx-curly-spacing': 'error',
    'react/jsx-equals-spacing': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-first-prop-new-line': 'error',
    'react/jsx-indent-props': [2, 2],
    'react/jsx-indent': [2, 2],
    'react/jsx-max-props-per-line': [1, { when: 'multiline' }],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-leaked-render': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-useless-fragment': 'error',
    // 'react/jsx-one-expression-per-line': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-sort-props': 'error',
    'react/jsx-tag-spacing': 'error',
    'react/self-closing-comp': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-invalid-html-attribute': 'error',
    'jsx-quotes': ['error', 'prefer-single'],
    'no-console': 'off'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    }
  }
}
