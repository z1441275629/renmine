const db = require("../db.js");

const add = async ({
        user_id,chinese,math,english,
        geograph,biology,physics,chemistry,
        pe,art,music,
        nature,science,
        politics,history,
        date
    }) => {
        return await db.q(`insert into score (
                user_id,chinese,math,english,
                geograph,biology,physics,chemistry,
                pe,art,music,
                nature,science,
                politics,history,
                date
            ) values(
                ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
            )`, [
                user_id,chinese,math,english,
                geograph,biology,physics,chemistry,
                pe,art,music,
                nature,science,
                politics,history,
                date
            ]);
}
function isNull (val) {
    let nullArr = [null, undefined, "", NaN];
    return nullArr.includes(val);
}
const list = async ({
        stage, grade, classId, subject, operator, value, perPageCount, curPage
    }) => {
        let arr = [];
        if(!isNull(stage)){
            arr.push(["st.id", stage, "="]);
        }
        if(!isNull(grade)){
            arr.push(["g.id", grade, "="]);
        }
        if(!isNull(classId)){
            arr.push(["u.class", classId, "="]);
        }
        // if(!isNull(subject) && !isNull(operator) && !isNull(value)){
        //     arr.push([`\`${subject}\``, value, operator]);
        // }

        let sql = `select 
            s.chinese,s.math,s.english,s.geograph,s.biology,s.physics,s.chemistry,
            s.pe,s.art,s.music,s.nature,s.science,
            s.politics,s.history, unix_timestamp(s.date) date, 
            u.name username, u.stage, u.class classId, u.grade,
            g.name gradeName, r.name roleName, st.name stageName
            from score as s
            left join user as u
            on s.user_id = u.id
            left join grade as g 
            on u.grade = g.id
            left join role as r
            on u.role = r.id
            left join stage as st
            on u.grade = st.id
        `;
        arr = arr.map(item => `${item[0]} ${item[2]} ${item[1]}`);
        sql += (arr.length ? " where " + arr.join(" AND ") : "");
        sql += ` limit ${perPageCount} offset ${(curPage - 1) * perPageCount} `;

        let totalSql = `select 
            count(*) as total
            from score as s
            left join user as u
            on s.user_id = u.id
            left join grade as g 
            on u.grade = g.id
            left join role as r
            on u.role = r.id
            left join stage as st
            on u.grade = st.id
        `;
        totalSql += (arr.length ? " where " + arr.join(" AND ") : "");

        console.log(sql);
        let list = await db.q(sql);
        let total = await db.q(totalSql);
        let totalCount = total[0].total;
        let pageCount = Math.ceil(totalCount/perPageCount);
        return {
            list,
            total: totalCount,
            pageCount,
            limit: +perPageCount,
            page: +curPage,
        }
}

module.exports = {
    add,
    list,
}