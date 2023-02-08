const Koa = require("koa");
const config = require("./config.js");
const userRouter = require("./router/user.js");
const dicRouter = require("./router/dictionary.js");
const scoreRouter = require("./router/score.js");
const emailRouter = require("./router/mail.js");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
//app.use(ctx => {
//	console.log(ctx);
//	ctx.body = ctx;
//});

// 这个要写到前面，因为后面要用请求体里面的东西
app.use(bodyParser());

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(userRouter.routes());
app.use(dicRouter.routes());
app.use(scoreRouter.routes());
app.use(emailRouter.routes());

//处理405 方法不匹配 和 501 方法未实现
app.use(userRouter.allowedMethods());

app.listen(config.appPort, (err) => {
  console.log(`服务启动在${config.appPort}端口`);
});
