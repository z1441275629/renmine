const db = require("../db.js");

const add = async ({ parentId, level, replyId, type, title, message, userId, time }) => {
  return await db.q(
    `insert into message (
      parentId, replyId, type, level, title, message, userId, time
    ) values (
      ?,?,?,?,?,?,?,?
    )`,
    [parentId, replyId, type, level, title, message, userId, time]
  );
};

function isNull(val) {
  let nullArr = [null, undefined, "", NaN];
  return nullArr.includes(val);
}

const list = async ({ parentId, type, offset, limit, order = "desc" }) => {
  let sql = `select 
    m.message, m.parentId, m.id, m.level, m.replyId, m.time, m.title, m.userId, m.type,
    u.name username, u.avatar
    from message as m
    left join users as u
    on m.userId = u.id
    ${isNull(parentId) ? `where m.parentId is null` : `where m.parentId = ${parentId}`}
    ${type ? ` and type = ${type}` : ""}
  `;
  sql += ` order by time ${order} limit ${limit} offset ${offset} `;

  let totalSql = `select 
            count(*) as total
            from message as m
            ${isNull(parentId) ? `where m.parentId is null` : `where m.parentId = ${parentId}`}
        `;

  let list = await db.q(sql);
  let total = await db.q(totalSql);
  let totalCount = total[0].total;
  let pageCount = Math.ceil(totalCount / limit);
  return {
    list,
    total: totalCount,
    pageCount,
    limit,
    page: offset / limit + 1,
  };
};

const getCommentCount = async ({ parentId }) => {
  let totalSql = `select 
  count(*) as total
  from message as m
  ${isNull(parentId) ? `where m.parentId is null` : `where m.parentId = ${parentId}`}
`;
  const count = await db.q(totalSql);
  return count[0].total;
};

const getUserTodayAddCount = async ({ userId }) => {
  let todayStart = new Date();
  todayStart.setHours(0);
  todayStart.setMinutes(0);
  todayStart.setSeconds(0);
  let todayEnd = new Date();
  todayEnd.setHours(23);
  todayEnd.setMinutes(59);
  todayEnd.setSeconds(59);

  const todayCountSql = `select 
    count(*) as count
    from message as m
    where m.userId = ${userId} and m.parentId is null and m.time < ${+todayEnd} and m.time > ${+todayStart}
  `;
  const count = await db.q(todayCountSql);
  return count[0].count;
};

const detail = async ({ id }) => {
  // let sql = `select
  //   m.message, m.parentId, m.id, m.time, m.title,
  //   u.name username
  //   from message as m
  //   left join users as u
  //   on m.userId = u.id
  //   where m.Id = ${id}
  // `;

  // create procedure getChildren(in parentId int)

  // create procedure getChildren
  // begin
  //   select m.message, m.parentId, m.id, m.time, m.title,
  //   u.name username
  //   from message as m
  //   left join users as u
  //   on m.userId = u.id
  //   where m.Id = ${id}
  // end
  let sql = `
    select 
      m.message, m.parentId, m.id, m.level, m.replyId, m.time, m.title, m.userId, m.type,
      u.name username, u.avatar
    from message as m
    left join users as u
    on m.userId = u.id
    where m.Id = ${id}
  `;

  return await db.q(sql);
};

module.exports = {
  add,
  list,
  detail,
  getCommentCount,
  getUserTodayAddCount,
};
