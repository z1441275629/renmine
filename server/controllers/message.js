const { success, fail } = require("../utils/setResponse");
const messageModels = require("../models/message/index.js");
const { getUserIdFromHeader } = require("../token");

const messageController = {
  async add(ctx) {
    ctx.verifyParams({
      message: {
        type: "string",
        required: true,
      },
    });
    const { request, response } = ctx;
    const { parentId, message, title } = request.body;

    const id = await getUserIdFromHeader(ctx);

    const res = await messageModels.add({ parentId, message, userId: id, title, time: Date.now() });
    response.body = success(res, "添加成功");
  },
  async list({ request, response }) {
    const { parentId = null, limit = 10, offset = 0 } = request.query;
    const res = await messageModels.list({ parentId, limit, offset });
    let detail;
    if (parentId) {
      [detail] = await messageModels.detail({ id: parentId });
    }
    response.body = success({ ...res, detail }, "查询成功");
  },
};

module.exports = messageController;
