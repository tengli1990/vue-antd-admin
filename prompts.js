module.exports = [
  {
    name: "name",
    type: "input",
    message: `请输入项目名称`,
    validate: input => !!input,
  },
  {
    name: "remote",
    type: "input",
    message: `请输入gitlab的remote地址`,
    validate: input => !!input,
  },
  {
    name: "echarts",
    type: "confirm",
    message: `是否安装echart组件`,
    default: false
  }
];