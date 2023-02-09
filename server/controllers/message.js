const { success, fail } = require("../utils/setResponse");
const messageModels = require("../models/message/index.js");
const storeInstance = require("../store");

const messageController = {
  async add({ request, response, verifyParams }) {
    const { parentId, massage, userId } = request.body;
    const res = await messageModels.add({ parentId, massage, userId, time: Date.now() });
    response.body = success(res, "添加成功");
  },
  async list({}) {},
};

module.exports = messageController;
