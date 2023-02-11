const jwt = require("json-web-token");
const { fail } = require("../utils/setResponse");

// const header = {
//   typ: "",
//   alg: "",
// };
const secret = "zds want to marry a nice girl";

/**
 * 生成token
 */
function getToken(data) {
  return new Promise((resolve, reject) => {
    jwt.encode(secret, data, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

function validToken(token) {
  return new Promise((resolve, reject) => {
    jwt.decode(secret, token, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getUserInfoFromToken(ctx) {
  let token = ctx.request.headers["authorization"].spilt("Bearer ")[1];
  if (token) {
    return validToken();
  } else {
    return null;
  }
}

async function getUserIdFromHeader(ctx) {
  let token = ctx.request.headers["authorization"].split("Bearer ")[1];
  if (token) {
    try {
      const { user } = await validToken(token);
      return user.Id;
    } catch (err) {
      console.log(err);
      return null;
    }
  } else {
    return null;
  }
}

/**
 * 需要校验token的接口
 */
const authUrl = ["/message/add"];
async function checkToken(ctx, next) {
  // split('?')[0]把字符串分割成字符串数组——拿到url值
  let url = ctx.url.split("?")[0];
  // 需要检验的接口校验token
  if (authUrl.includes(url)) {
    //获取到token
    let token = ctx.request.headers["authorization"].split("Bearer ")[1];
    if (token) {
      // 如果有token的话解析
      const tokenItem = await validToken(token);
      // 把创建时间和过期时间析构出来
      const { time, timeout } = tokenItem;
      // 拿到当前时间
      let NewTime = Date.now();
      if (NewTime - time <= timeout) {
        // 说明没过期
        await next();
        return;
      } else {
        ctx.body = fail(null, "Token is expired", "403");
      }
    } else {
      ctx.body = fail(null, "Please login", "401");
    }
  }
  await next();
}

module.exports = {
  getToken,
  validToken,
  checkToken,
  getUserIdFromHeader,
};
