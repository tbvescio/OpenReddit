const createError = require('http-errors')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Account = require("../models/account");

exports.signup = async (req, res, next) => {
  const {username, password} = req.body;
  const created_date = new Date();

  try {
    const user = await Account.findOne({ username: username });
    if (user) {
      const error = new Error("User already exists!");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassw = await bcrypt.hash(password, 12);
    const account = new Account({
      username: username,
      password: hashedPassw,
      created_date: created_date,
    });

    const result = await account.save();
    return res.status(201).json({ message: "User created!", userId: result._id });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};

exports.login = async (req, res, next) => {
  const {username, password} = req.body;
  let loadedUser;

  try {
    const user = await Account.findOne({ username: username });
    if (!user) {
      const error = new Error("User does not exists!");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong data!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        username: loadedUser.username,
        password: loadedUser.password,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
    return res
      .status(200)
      .json({ token: token, AccountId: loadedUser._id.toString(), username: username });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};
