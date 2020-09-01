const expect = require("chai").expect;
const sinon = require("sinon");

const Account = require("../models/account");
const AuthController = require("../controllers/auth");

describe("Auth Controller", () => {
  describe("Login", () => {
    it("throw error if user dont exists", (done) => {
      sinon.stub(Account, "findOne");
      Account.findOne.returns(null);

      const req = {
        body: {
          username: "test",
          password: "test",
        },
      };

      AuthController.login(req, {}, () => {}).then((result) => {
        expect(result).to.be.an("error");
        expect(result.message, "User does not exists!");
        done();
      });

      Account.findOne.restore();
    });

    it("throw error if connection to database fail", (done) => {
      sinon.stub(Account, "findOne");
      Account.findOne.throws();

      const req = {
        body: {
          username: "test",
          password: "test",
        },
      };

      AuthController.login(req, {}, () => {}).then((result) => {
        expect(result).to.be.an("error");
        done();
      });

      Account.findOne.restore();
    });
  });

  describe("Signup", () => {
    it("throw error if user already exists", (done) => {
      sinon.stub(Account, "findOne");
      Account.findOne.returns("user");

      const req = {
        body: {
          username: "test",
          password: "test",
        },
      };

      AuthController.signup(req, {}, () => {}).then((result) => {
        expect(result).to.be.an("error");
        expect(result).to.be.an("error").to.have.property('statusCode', 409);
        done();
      });
      Account.findOne.restore();
    });

    it("throw error if connection to database fail", (done) => {
      sinon.stub(Account, "findOne");
      Account.findOne.throws();

      const req = {
        body: {
          username: "test",
          password: "test",
        },
      };

      AuthController.signup(req, {}, () => {}).then((result) => {
        expect(result).to.be.an("error");
        done();
      });
      Account.findOne.restore();
    });
  });
});
