const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData:
          ' @import "@/styles/variables.scss"; @import "@/styles/mixin.scss"; ' // 引入全局 SasS 变量的文件（对应你全局文件的路径） 8版本用prependData
      }
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  devServer: {
    https: false,
    hot: false,
    open: true,
    proxy: {
      '/api': {
        target: 'https://lianghj.top:8888/api/private/v1',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
