import antfu from '@antfu/eslint-config'

export default antfu({
  vue: {
    a11y: true,
  },
  rules: {
    'no-console': 'off',
    'no-case-declarations': 'off',
    'vue/block-order': 'off',
    'regexp/no-unused-capturing-group': 'off',
    'antfu/top-level-function': 'off',
    'vue-a11y/no-static-element-interactions': 'off',
    'vue-a11y/label-has-for': 'off',
  },
  formatters: {
    css: true,
    html: true,
  },
})
