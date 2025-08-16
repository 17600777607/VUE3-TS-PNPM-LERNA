import eslint from '@eslint/js';
import { Linter } from 'eslint';
import vue from 'eslint-plugin-vue';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import vueEslintParser from 'vue-eslint-parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

type FlatConfig = Linter.FlatConfig;

export default [
  { ignores: ['node_modules/', 'dist/', 'public/', '.vscode/'] },
  // 全局配置
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        node: true,
        es2021: true,
        console: true, // 添加console全局变量
        process: true, // 添加process全局变量支持Node.js环境
      },
    },
  },
  // JavaScript文件配置
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  eslint.configs.recommended,
  // Vue配置
  ...vue.configs['flat/recommended'],
  // 自定义Vue规则
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
        // 为Vue文件中的TypeScript提供支持
        parser: {
          js: 'espree',
          ts: typescriptParser,
        },
      },
    },
    rules: {
      'vue/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // 移除project选项以避免文件未找到错误
      },
      globals: {
        node: true,
        process: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...typescriptEslint.configs.strict.rules, // 添加严格模式规则
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off', // 可选：关闭显式返回类型要求
    },
  },
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
  prettierConfig,
] as FlatConfig[];
