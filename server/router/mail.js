const Router = require("koa-router");
const emailController = require("../controllers/mail.js");

const emailRouter = new Router();

emailRouter.post("/email/register", emailController.sendRegisterCode);

module.exports = emailRouter;
