const dictionary = require("../models/common/index");
const config = require("../config");
const { successCode, successDesc } = config;
module.exports = {
    // 角色列表
    async roleList({request, response}){
        let res  = await dictionary.roleList();
        response.body = {
            code: successCode,
            msg: successDesc,
            data: res
        }
    },
    // 全体学生列表
    async studentList({request, response}){
        let res  = await dictionary.studentList();
        response.body = {
            code: successCode,
            msg: successDesc,
            data: res
        }
    },
    // 某班级中的学生列表
    async studentClassList({request, response}){
        let {classId} = request;
        let res  = await dictionary.studentClassList({ classId });
        response.body = {
            code: successCode,
            msg: successDesc,
            data: res
        }
    },
    // 阶段列表
    async stageList({request, response}){
        let res = await dictionary.stageList();
        response.body = {
            code: successCode,
            msg: successDesc,
            data: res
        }
    },
    // 年级列表
    async gradeList({request, response}){
        let res = await dictionary.gradeList();
        response.body = {
            code: successCode,
            msg: successDesc,
            data: res
        }
    },
}