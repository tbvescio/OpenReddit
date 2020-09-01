exports.getCookie = (a) => {
  var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
};
exports.setCookie = (name, value) => {
  document.cookie = name + "= " + value;
};

exports.deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
