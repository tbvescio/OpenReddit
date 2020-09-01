const expect = require("chai").expect;
const sinon = require("sinon");

const Account = require("../models/account");
const Subreddit = require("../models/subreddit");
const Post = require("../models/post");
const SubredditController = require("../controllers/subreddit");

describe("Subreddit Controller", () => {
  describe("createSubreddit", () => {
    it("throw error if subreddit already exists", (done) => {
      sinon.stub(Subreddit, "findOne");
      Subreddit.findOne.returns("something");

      const req = {
        body: {
          name: "",
          description: "",
        },
      };

      SubredditController.createSubreddit(req, {}, () => {}).then((result) => {
        expect(result).to.be.an("error").to.have.property("statusCode", 409);
        done();
      }).catch(done);
      Subreddit.findOne.restore();
    });
  });

  describe("getSubreddit", () => {
    it("throw error if subreddit dont  exists", (done) => {
      sinon.stub(Subreddit, "findOne");
      Subreddit.findOne.returns(null);

      const req = {
        params: {
          subreddit: ""
        },
      };

      SubredditController.getSubreddit(req, {}, () => {}).then((result) => {
        expect(result).to.be.an("error").to.have.property("statusCode", 404);
        done();
      }).catch(done);
      Subreddit.findOne.restore();
    });
  });

});
