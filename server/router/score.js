const Router = require("koa-router");
let scoreRouter = new Router();

let scoreController = require("../controllers/score.js");

scoreRouter
.post("/score/add", scoreController.add)
// .get("/user/detail", scoreController.detail)
// .post("/user/edit", scoreController.edit)
// .post("/user/del", scoreController.del)
.get("/score/list", scoreController.list)

module.exports = scoreRouter;