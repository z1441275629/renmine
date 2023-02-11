const { success, fail } = require("../utils/setResponse");
const messageModels = require("../models/message/index.js");
const storeInstance = require("../store");
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
    const { parentId, message, userId } = request.body;

    const id = await getUserIdFromHeader(ctx);
    console.log(id, "id");

    const res = await messageModels.add({ parentId, message, userId: id, time: Date.now() });
    response.body = success(res, "添加成功");
  },
  async list({ request, response }) {
    const { parentId = null, limit = 10, offset = 0 } = request.body;
    const res = await messageModels.list({ parentId, limit, offset });
    response.body = success(res, "查询成功");
  },
};

module.exports = messageController;
