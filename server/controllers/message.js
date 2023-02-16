const { success, fail } = require("../utils/setResponse");
const messageModels = require("../models/message/index.js");
const { getUserIdFromHeader } = require("../token");

const messageTypeMap = {
  1: "求助",
};

const messageController = {
  async add(ctx) {
    ctx.verifyParams({
      message: {
        type: "string",
        required: true,
      },
    });
    const { request, response } = ctx;
    const { parentId, level, replyId, type, message, title } = request.body;

    const id = await getUserIdFromHeader(ctx);

    const res = await messageModels.add({
      parentId,
      level,
      replyId,
      type,
      message,
      userId: id,
      title,
      time: Date.now(),
    });
    response.body = success(res, "添加成功");
  },
  async list({ request, response }) {
    const { parentId = null, type = null, limit = 10, offset = 0 } = request.query;
    const res = await messageModels.list({ parentId, type, limit, offset, order: parentId ? "asc" : "desc" });
    for (let item of res.list) {
      if (parentId === null) {
        item.commentCount = await messageModels.getCommentCount({ parentId: item.id });
      } else {
        item.typeName = messageTypeMap[item.type] || null;
        const childRes = await messageModels.list({ parentId: item.id, limit: 100, offset: 0, order: "asc" });
        item.children = childRes.list;
        for (let replyItem of item.children) {
          if (replyItem.replyId) {
            const replyData = await messageModels.detail({ id: replyItem.parentId });
            replyItem.replyUser = replyData[0] && replyData[0].username;
          } else {
            replyItem.replyUser = "";
          }
        }
      }
    }
    let detail;
    if (parentId) {
      [detail] = await messageModels.detail({ id: parentId });
    }
    response.body = success({ ...res, detail }, "查询成功");
  },
};

module.exports = messageController;
