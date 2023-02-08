const db = require("../db.js");

// 角色列表
const roleList = async () => {
    // return await db.q("select * from role");
    return await db.q("select Id as id, name from role");
}

// 学生列表——一个班
const studentClassList = async (classId, grade, stage) => {
    return await db.q("select id,name from user where role = 1 and stage = ? and grade = ? class = ?", [stage, grade, classId]);
}

// 所有学生列表
const studentList = async () => {
    return await db.q("select id,name,class from user where  role = 1");
}

// 阶段（学历）列表
const stageList = async () => {
    return await db.q("select id,name from stage");
}

// 年级列表
const gradeList = async () => {
    return await db.q("select id,name from grade");
}

module.exports = {
    roleList,
    studentClassList,
    studentList,
    stageList,
    gradeList,
}