const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

describe("POSTS", () => {
  describe("POST /create-post", () => {
    let token;
    beforeEach((done) => {
      request
        .post("/api/auth/login")
        .send({ username: "test", password: "test" })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it("should create a test post ", (done) => {
      request
        .post("/api/create-post")
        .set("Authorization", "Bearer " + token)
        .send({ subreddit: "test", title: "test", body: "test" })
        .expect(201, done);
    });
  });

  describe("PUT /vote-post", () => {
    let token;
    beforeEach((done) => {
      request
        .post("/api/auth/login")
        .send({ username: "test", password: "test" })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it("should upvote a post ", (done) => {
      request
        .put("/api/vote-post")
        .set("Authorization", "Bearer " + token)
        .send({ postId: "5f778cacec992102ec913c37", isUpvote: true })
        .expect(200, done);
    });
  });

  describe("POST /create-comment", () => {
    let token;
    beforeEach((done) => {
      request
        .post("/api/auth/login")
        .send({ username: "test", password: "test" })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it("should create a comment ", (done) => {
      request
        .post("/api/create-comment")
        .set("Authorization", "Bearer " + token)
        .send({
          postId: "5f778cacec992102ec913c37",
          body: "test comment",
          username: "test",
        })
        .expect(200, done);
    });
  });

  describe("PUT /vote-comment", () => {
    let token;
    beforeEach((done) => {
      request
        .post("/api/auth/login")
        .send({ username: "test", password: "test" })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it("should create a comment ", (done) => {
      request
        .put("/api/vote-comment")
        .set("Authorization", "Bearer " + token)
        .send({
          commentId: "5f888d9af439ce098ca02076",
          isUpvote: true
        })
        .expect(200, done);
    });
  });

  describe("POST /api/r/:subreddit/:postId", () => {
    it("should retrive a post with comments ", (done) => {
      request.get("/api/r/test/5f778cacec992102ec913c37").expect(200, done);
    });
  });

  describe("GET /api/r/:subreddit/:postId", () => {
    it("should retrive a post with comments ", (done) => {
      request.get("/api/r/test/5f778cacec992102ec913c37").expect(200, done);
    });
  });

  describe("DELETE /delete-post", () => {
    let token;
    beforeEach((done) => {
      request
        .post("/api/auth/login")
        .send({ username: "test", password: "test" })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it("should create a comment ", (done) => {
      request
        .delete("/api/delete-post")
        .set("Authorization", "Bearer " + token)
        .send({
          postId: "5f888d9af439ce098ca",
        })
        .expect(400, done);
    });
  });
});
