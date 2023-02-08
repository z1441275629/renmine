function success(data, message = "成功", code = "0000") {
  return {
    data,
    message,
    code,
  };
}

function fail(data, message = "失败", code = "9999") {
  return {
    data,
    message,
    code,
  };
}

module.exports = {
  success,
  fail,
};
