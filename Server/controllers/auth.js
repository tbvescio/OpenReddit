const Account = require("../models/account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
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
    res.status(201).json({ message: "User created!", userId: result._id });
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
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
    res
      .status(200)
      .json({ token: token, AccountId: loadedUser._id.toString() });
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};
