module.exports = {
  pages: {
    index: {
      entry: "examples/main.ts",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  css: {
    extract: false //强制使用内联样式，这样打包出的插件样式会内置在js中，不需要单独引入,因为只有一套主题，所以这样比较方便
  },
  productionSourceMap: process.env.NODE_ENV === "development"
};
