const { success, fail } = require("../utils/setResponse");
const userModels = require("../models/user/index.js");
const storeInstance = require("../store");
const { getToken } = require("../token");

const record = storeInstance.store;

const c = {
  async add({ request, response, verifyParams }) {
    console.log(verifyParams, "verifyParams");
    const { name, email, password } = request.body;
    const res = await userModels.add({ name, email, password });
    response.body = success(res, "添加成功");
  },
  async edit({ request, response }) {
    let { id, name, email, password } = request.body;
    let res = await userModels.edit({ id, name, email, password });
    response.body = success(res, "编辑成功");
  },
  async detail({ request, response }) {
    try {
      let res = await userModels.detail(request.query.id);
      response.body = success(res, "查询成功");
    } catch (err) {}
  },
  async del({ request, response }) {
    try {
      let res = await userModels.del(request.body.id);
      response.body = {
        code: "0000",
        msg: "成功",
        data: res,
      };
    } catch (err) {}
  },
  async list({ request, response }) {
    let { stage, grade, classId, perPageCount, curPage } = request.query;
    let res = await userModels.list({
      stage,
      grade,
      classId,
      perPageCount,
      curPage,
    });
    response.body = {
      code: "0000",
      msg: "成功",
      data: res,
    };
  },
  async register(ctx) {
    const { request, response, verifyParams } = ctx;
    ctx.verifyParams({
      name: { type: "string", required: true },
      email: { type: "email", required: true },
      password: { type: "string", required: true },
      code: { type: "string", required: true },
    });

    try {
      const { name, email, password, code } = request.body;
      if (!record.get(email)) {
        response.body = fail(null, "请先获取验证码");
        return;
      }
      if (record.get(email) !== code) {
        response.body = fail(null, "验证码错误");
        return;
      }
      const emailData = await userModels.isEmailExist(email);
      if (emailData && emailData.length) {
        response.body = fail(null, "邮箱已被注册");
        return;
      }
      const res = await userModels.add({ name, email, password });
      response.body = success(res, "注册成功");
    } catch (err) {
      response.body = fail(err, "注册失败");
    }
  },
  async login({ request, response }) {
    try {
      let { name, email, password } = request.body;
      let res = await userModels.login({ name, email, password });
      if (res && res.length) {
        const user = res[0];
        const payload = {
          user,
          time: Date.now(),
          timeout: 1000 * 60 * 60 * 24 * 7,
        };
        const token = await getToken(payload);
        response.body = success({ token, username: user.name, id: user.Id }, "登录成功");
      } else {
        response.body = fail(null, "账号或密码错误", "4000");
      }
    } catch (err) {
      response.body = fail(err, "服务器异常");
    }
  },
};

module.exports = c;
