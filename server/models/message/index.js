const db = require("../db.js");

const add = async ({ parentId, message, userId, time }) => {
  return await db.q(
    `insert into message (
      parentId, message, userId, time
    ) values (
      ?,?,?,?
    )`,
    [parentId, message, userId, time]
  );
};

function isNull(val) {
  let nullArr = [null, undefined, "", NaN];
  return nullArr.includes(val);
}

const list = async ({ parentId, offset, limit }) => {
  let sql = `select 
    m.message, m.parentId, m.id, unix_timestamp(m.time) time, 
    u.name username
    from message as m
    left join users as u
    on m.userId = u.id
    ${isNull(parentId) ? `where m.parentId is null` : `where m.parentId = ${parentId}`}
  `;
  sql += ` limit ${limit} offset ${offset} `;

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

module.exports = {
  add,
  list,
};
