const Router = require("koa-router");
const messageController = require("../controllers/message.js");

const messageRouter = new Router();

messageRouter.post("/message/add", messageController.add);
messageRouter.get("/message/list", messageController.list);

module.exports = messageRouter;
