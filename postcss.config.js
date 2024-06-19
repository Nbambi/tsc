module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 16, // 根元素的字体大小
      propList: ["*"], // 需要转换的属性列表
      unitPrecision: 3, // 单位转换后保留的小数位数
      minPixelValue: 8, // 低于8px的元素不转换单位
      exclude: ["node_modules"],
    },
  },
};
