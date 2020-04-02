module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 组件/实例的选项的顺序
    'vue/order-in-components': [2, {
      order: [
        'el',
        'name',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        'mixins',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'data',
        'computed',
        'watch',
        'LIFECYCLE_HOOKS',
        'methods',
        ['template', 'render'],
        'renderError'
      ]
    }],
    // 多个特性的元素应该分多行撰写，每个特性一行
    'vue/max-attributes-per-line': [2, {
      singleline: 10,
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],
    // 在声明prop的时候，其命名应该始终使用驼峰命名
    // "vue/prop-name-casing": [2, "camelCase"],
    // 给v-for设置键值，与key结合使用，可以高效的更新虚拟DOM
    'vue/require-v-for-key': 2,
    // 不要把 v-if 和 v-for 用在同一个元素上——因为v-for 比 v-if 具有更高的优先级
    'vue/no-use-v-if-with-v-for': [2, {
      allowUsingIterationVar: false
    }],
    // JS/JSX中的组件名应该始终是帕斯卡命名法
    'vue/name-property-casing': [2, 'PascalCase'],

    // 禁止扩展原生对象
    'no-extend-native': 2
    // 强制驼峰法命名
    // 'camelcase': [2, {
    //   'properties': 'always'
    // }],
  }
}
