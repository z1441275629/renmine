const Router = require("koa-router");
let dicRouter = new Router();

let dicController = require("../controllers/dictionary.js");
console.log(dicController)

dicRouter.get("/dictionary/roleList", dicController.roleList)
.get("/dictionary/studentClassList", dicController.studentClassList)
.get("/dictionary/studentList", dicController.studentList)
.get("/dictionary/stageList", dicController.stageList)
.get("/dictionary/gradeList", dicController.gradeList)

module.exports = dicRouter;