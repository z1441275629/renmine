const Router = require("koa-router");
let userRouter = new Router();

let userController = require("../controllers/user.js");

userRouter
  .get("/user/detail", userController.detail)
  .post("/user/add", userController.add)
  .post("/user/edit", userController.edit)
  .get("/user/list", userController.list)
  .post("/user/login", userController.login)
  .post("/user/register", userController.register)
  .delete("/user/del", userController.del);

module.exports = userRouter;
