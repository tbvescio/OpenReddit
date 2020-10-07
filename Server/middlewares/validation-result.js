const { body, validationResult } = require("express-validator");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("wrong data, check the documentation endpoint!");
    error.statusCode = 400;
    return next(createError(error.statusCode || 500 , error));
  }
  next();
};
