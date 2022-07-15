import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    define: {
      __DEV__: command === 'serve', // mode === "development"
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        // 兼容 css-loader 加载path alias格式 https://github.com/webpack-contrib/css-loader#url
        '~@': path.resolve(__dirname, 'src'),
      },
    },
  }
})
