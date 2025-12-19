module.exports = {
  transpileDependencies: ['@dcloudio/uni-ui'],
  devServer: {
    port: 8081,
    proxy: {
      '/dev-api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    }
  }
}
