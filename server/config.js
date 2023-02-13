const path = require("path"); // 核心对象
module.exports = {
  //viewDir:path.resolve('./views'),
  //staticDir:path.resolve('./public'),
  appPort: 8888,
  // dbConfig: {
  //   connectionLimit: 10,
  //   host: "localhost",
  //   user: "root",
  //   password: "root",
  //   database: "renmine", // 得胜
  // },
  dbConfig: {
    connectionLimit: 10,
    host: "94.74.123.45",
    user: "root",
    password: "zds123",
    database: "renmine", // 得胜
  },
  successCode: "0000",
  successDesc: "成功",

  host: "smtp.qq.com", //  邮箱
  service: "QQ", //  邮箱
  post: "465", // https://service.mail.qq.com/detail/0/427
  secure: true, //  安全的发送模式
  auth: {
    user: "1441275629@qq.com", //  发件人邮箱
    pass: "qlbhlqoezahrhbdj", //  授权码
  },
  from: "1441275629@qq.com", // 发送邮箱
};
