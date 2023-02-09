const jwt = require("json-web-token");

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

module.exports = {
  getToken,
  validToken,
};
