import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

import globals from 'globals'

export default [
  {
    ignores: ['dist/', '.vscode/', '.cursor/'],
  },
  // Base JavaScript configuration
  js.configs.recommended,

  // Vue.js specific configuration
  ...pluginVue.configs['flat/strongly-recommended'],

  {
    files: ['**/*.{js,vue}'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'off',
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },

  // Configuration for build files
  {
    files: ['vite.config.js', 'postcss.config.js', 'scripts/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  eslintPluginPrettierRecommended,
]
