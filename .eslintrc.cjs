module.exports = {
  root: true,
  extends: [
    require.resolve('eslint-config-airbnb'),
    require.resolve('eslint-config-airbnb/hooks'),
    require.resolve('eslint-config-airbnb-typescript')
  ],
  rules: {
    'react/function-component-definition': 0, //不強制react的component使用function函式寫法，也就是也可以使用箭頭函式的寫法
    'react/react-in-jsx-scope': 0, //不強制在各個jsx文件裡import react
    'import/prefer-default-export': 0, // 不強制在每個jsx文件必須要export default
    'react-hooks/exhaustive-deps': 1, // 每個hooks不需要都要有dependance , 設置1代表warnning狀態，限度降低
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0
  },
  parser: require.resolve('@typescript-eslint/parser'),

  parserOptions: {
    project: require.resolve('./tsconfig.json'),
  },

  settings: {
    react: {
      'version': 'detect'
    },
    'import/resolver': {
      'alias': {
        'map': [
          [
            '@', './src'
          ]
        ],
        'extensions': ['.ts', '.tsx']
      }
    }
  }
}
