const scoreModels = require("./../models/score/index");

module.exports = {
    async add({request,response}){
        let {
            user_id,chinese,math,english,
            geograph,biology,physics,chemistry,
            pe,art,music,
            nature,science,
            politics,history,
            date
        }  = request.body;

        let res = await scoreModels.add({
            user_id,chinese,math,english,
            geograph,biology,physics,chemistry,
            pe,art,music,
            nature,science,
            politics,history,
            date
        });
        response.body = {
            code: "0000",
            msg: "success",
            data: res
        }
    },
    async list({request, response}){
        let { stage, grade, classId, subject, operator, value, perPageCount, curPage } = request.query;
        let res = await scoreModels.list({ stage, grade, classId, subject, operator, value, perPageCount, curPage });
        response.body = {
            code: "0000",
            msg: "success",
            data: res
        }
    }
}