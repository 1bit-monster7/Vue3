/* postcss - autoprefixer 自动为各浏览器添加前缀做兼容性处理 */
module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['> 0% ']
    }
  }
}
