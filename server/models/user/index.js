const db = require("../db.js");

function isNull(val) {
  let nullArr = [null, undefined, "", NaN];
  return nullArr.includes(val);
}

// 查询所有
const list = async ({ stage, grade, classId, perPageCount, curPage }) => {
  // return await db.q("select * from users", []);
  let arr = [];
  if (!isNull(stage)) {
    arr.push(["st.id", stage, "="]);
  }
  if (!isNull(grade)) {
    arr.push(["g.id", grade, "="]);
  }
  if (!isNull(classId)) {
    arr.push(["u.class", classId, "="]);
  }
  let sql = `select 
		u.id, u.name, u.phone, u.email, u.password,
		u.role, u.class as classId, u.grade, u.stage, 
		u.date, g.name as gradeName, r.name as roleName, st.name as stageName
		from users as u
		left join grade as g 
		on u.grade = g.id
		left join role as r
		on u.role = r.id
		left join stage as st
		on u.grade = st.id`;
  arr = arr.map((item) => `${item[0]} ${item[2]} ${item[1]}`);
  sql += arr.length ? " where " + arr.join(" AND ") : "";
  sql += ` limit ${perPageCount} offset ${(curPage - 1) * perPageCount} `;

  let totalSql = `select 
		count(*) as total
		from users as u
		left join grade as g 
		on u.grade = g.id
		left join role as r
		on u.role = r.id
		left join stage as st
		on u.grade = st.id
	`;
  totalSql += arr.length ? " where " + arr.join(" AND ") : "";
  let list = await db.q(sql);
  let total = await db.q(totalSql);
  let totalCount = total[0].total;
  let pageCount = Math.ceil(totalCount / perPageCount);
  return {
    list,
    total: totalCount,
    pageCount,
    limit: +perPageCount,
    page: +curPage,
  };
};
// 添加用户
//const add = async (userObj) => {
//	return await db.q("insert into users (username, phone) values (?,?)", [userObj.username, userObj.phone]);
//}

// 添加用户
const add = async ({ name, email, password, avatar }) => {
  return await db.q("insert into users (name, email, password, avatar) values (?,?,?,?)", [
    name,
    email,
    password,
    avatar,
  ]);
};

// 删除用户
const del = async (id) => {
  return await db.q("delete from users where id = ?", [id]);
};

// 修改用户
const edit = async ({ id, name, email, password }) => {
  return await db.q("update users set name = ?, email = ?, password = ? where id = ?", [name, email, password, id]);
};

// 详情
const detail = async (id) => {
  return await db.q("select * from users where id = ?", [id]);
};

// 登录--根据用户名或邮箱以及密码查找用户
const login = async ({ name, password, email }) => {
  // let whereCause = "";
  // if(phone){
  // 	whereCause = `phone = '${phone}' and password = '${password}'`;
  // }else{
  // 	whereCause = `email = '${email}' and password = '${password}'`;
  // }
  // return await db.q("select * from users where " + whereCause);

  let keywords = name || email;
  return await db.q(
    `select Id, email, name, avatar from users where (name = '${keywords}' or email = '${keywords}') and password = '${password}'`
  );
};

// 邮箱是否注册
const isEmailExist = async (email) => {
  return await db.q("select * from users where email = ?", [email]);
};

// 修改密码
const updatePassword = async ({ email, password }) => {
  return await db.q("update users set password = ? where email = ?", [password, email]);
};

module.exports = {
  list,
  add,
  del,
  edit,
  detail,
  login,
  isEmailExist,
  updatePassword,
};
