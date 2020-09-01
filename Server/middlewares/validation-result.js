const { body, validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("wrong data, check the documentation endpoint!");
    error.statusCode = 400;
    throw error;
  }
  next();
};
