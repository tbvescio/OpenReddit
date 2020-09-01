const expect = require("chai").expect;
const sinon = require("sinon");

const Post = require("../models/post");
const Account = require("../models/account");
const Comment = require("../models/comment");
const PostController = require("../controllers/posts");
const post = require("../models/post");

describe("Post Controller", () => {
  describe("Vote post", () => {
    it("throw error if post dont exists", (done) => {
      sinon.stub(Post, "findOne");
      Post.findOne.returns(null);

      const req = {
        body: {
          postId: "",
          isUpvote: "",
        },
      };

      PostController.votePost(req, {}, () => {})
        .then((result) => {
          expect(result).to.be.an("error").to.have.property("statusCode", 404);
          done();
        })
        .catch(done);

      Post.findOne.restore();
    });
  });
  describe("Vote comment", () => {
    it("throw error if comment dont exists", (done) => {
      sinon.stub(Comment, "findOne");
      Comment.findOne.returns(null);

      const req = {
        body: {
          commentId: "",
          isUpvote: "",
        },
      };

      PostController.voteComment(req, {}, () => {})
        .then((result) => {
          expect(result).to.be.an("error").to.have.property("statusCode", 404);
          done();
        })
        .catch(done);

      Comment.findOne.restore();
    });
  });

  describe("PostById", () => {
    it("throw error if post dont exists", (done) => {
      sinon.stub(Post, "findOne");
      Post.findOne.returns(null);

      const req = {
        params: {
          subreddit: "",
          postId: "",
        },
      };

      PostController.postById(req, {}, () => {})
        .then((result) => {
          expect(result).to.be.an("error").to.have.property("statusCode", 404);
          done();
        })
        .catch(done);

      Post.findOne.restore();
    });
  });
});
