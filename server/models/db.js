// 1. 
const mysql = require("mysql");
const config = require("../config");
const { dbConfig } = config;
// 2. 
const pool = mysql.createPool(dbConfig);

let db = {
	q: (sql, params) => {
		return new Promise((resolve, reject) => {
			// 3.
			pool.getConnection((err, connection) => {
				if(err){
					reject(err);
					return;
				}
				//4. 
				connection.query(sql, params, (err, res, fields) => {
					connection.release();
					if(err){
						reject(err);
						return;
					}
					resolve(res);
				});
			});
		});
	},
	join: {
		// math >= 60     math = 60     name like %60%		单个条件
		// let item = { fields: "math", value: 60, operator: ">=" };
		// math > 60 or chinese > 60      math>60 and chinese>60		条件组合方式

		// and(field, value, operator){
			
		// 	return `${field} ${operator} ${value}`;
		// },
		// or(){
		// 	return this;
		// },
		// in(){
		// 	return this;
		// },
		// like(){
		// 	return this;
		// },
		// between(){
		// 	return this;
		// },
		item(field, value, operator){
			operator = operator.toLowerCase();
			let res = "";
			switch(true){
				case operator == "like": // 
					res = `%'${value}'%`; break;
				case operator == "between": // 介于
					res = `${value[0]} and ${value[1]}`; break;
				case operator == "in": // 包含
					res = `(${value.map(item => String(item)).join(",")})`; break;
				case operator == "gt": // 大于
					res = `${field} > '${value}'`;break;
				case operator == "lt": // 小于
					res = `${field} < '${value}'`;break;
				case operator == "egt": // 大于等于
					res = `${field} >= '${value}'`;break;
				case operator == "elt": // 小于等于
					res = `${field} <= '${value}'`;break;
				case operator == "eq": // 等于
					res = `${field} = '${value}'`;break;
				case operator == "neq": // 不等于
					res = `${field} <> '${value}'`;break;
				case operator == "notnull": // 不为空
					res = `${field} is not null`;break;
				case operator == "null": // 为空
					res = `${field} is null`;break;
				default: res = `${field} = '${value}'`;break; // 默认相等操作
			}
			return res;
		},
		combine(list, combineMethod="AND"){
			return list.join(` ${combineMethod} `);
		},
		delNullParam(obj){
			for(let key in obj){
				if(!['null', 'notnull'].includes(obj[key])){
					if([NaN, '', undefined, null].includes(obj[key])){
						delete obj[key];
					}
				}
			}
			return obj;
		}
	}
}

module.exports = db;