const expect = require("chai").expect;
const sinon = require("sinon");

const Account = require("../models/account");
const Subreddit = require("../models/subreddit");
const AccountController = require("../controllers/account");

describe("Account Controller", () => {
  describe("getUserProfile", () => {
    it("throw error if user dont exists", (done) => {
      sinon.stub(Account, "findOne");
      Account.findOne.returns(null);

      const req = {
        params: {
          username: "test",
        },
      };

      AccountController.getUserProfile(req, {}, () => {}).then((result) => {
        expect(result).to.be.an("error");
        expect(result).to.be.an("error").to.have.property("statusCode", 404);
        done();
      });
      Account.findOne.restore();
    });
  });

  describe("suscribe", () => {
    it("throw error if subreddit dont exists", (done) => {
      sinon.stub(Subreddit, "findOne");
      Subreddit.findOne.returns(null);

      const req = {
        params: {
          subreddit: "test",
        },
      };

      AccountController.suscribe(req, {}, () => {})
        .then((result) => {
          expect(result).to.be.an("error");
          expect(result).to.be.an("error").to.have.property("statusCode", 409);
          done();
        })
        .catch(done);
      Subreddit.findOne.restore();
    });
  });

  describe("unsuscribe", () => {
    it("throw error if subreddit dont exists", (done) => {
      sinon.stub(Subreddit, "findOne");
      Subreddit.findOne.returns(null);

      const req = {
        params: {
          subreddit: "test",
        },
      };

      AccountController.unSuscribe(req, {}, () => {})
        .then((result) => {
          expect(result).to.be.an("error");
          expect(result).to.be.an("error").to.have.property("statusCode", 409);
          done();
        })
        .catch(done);
      Subreddit.findOne.restore();
    });
  });
});
