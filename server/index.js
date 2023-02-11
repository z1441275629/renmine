const Koa = require("koa");
const config = require("./config.js");
const userRouter = require("./router/user.js");
const emailRouter = require("./router/mail.js");
const messageRouter = require("./router/message.js");
const bodyParser = require("koa-bodyparser"); //
const parameter = require("koa-parameter"); // 参数校验
const error = require("koa-json-error");
const { checkToken } = require("./token/index");

const app = new Koa();
//app.use(ctx => {
//	console.log(ctx);
//	ctx.body = ctx;
//});

// 这个要写到前面，因为后面要用请求体里面的东西
app.use(bodyParser());

// 错误捕获
app.use(
  error({
    postFormat: (e, stack, ...rest) => (process.env.NODE_ENV === "production" ? rest : { stack, ...rest }),
  })
);

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  console.log("token", ctx.header.token);
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(checkToken);

// 参数校验
app.use(parameter(app));

app.use(userRouter.routes());
app.use(emailRouter.routes());
app.use(messageRouter.routes());

//处理405 方法不匹配 和 501 方法未实现
app.use(userRouter.allowedMethods());

app.listen(config.appPort, (err) => {
  console.log(`服务启动在${config.appPort}端口`);
});
