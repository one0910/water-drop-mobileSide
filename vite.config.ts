// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config' //使用vitest/config取代原本的vite，這樣就可以進進vitest
import path from 'path'
import react from '@vitejs/plugin-react'
import postCssPxToViewport from 'postcss-px-to-viewport-8-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', //啟用可透過iP地址訪問的開關
    port: 3333,
    // open: true,
    cors: true,
    proxy: {
      '/graphql': 'http://localhost:3000'
    }
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src')
      }
    ]
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToViewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 390, // UI设计稿的宽度
          unitPrecision: 3, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          exclude: [],
          landscape: false // 是否处理横屏情况
        })
      ]
    }
  },
  test: {
    globals: true, //可以直接在全域下使用vitest所提供的測試方法
    environment: 'jsdom', //jsdom代表執時測試時，其環境支是援虛擬DOM的測試
  },
})
