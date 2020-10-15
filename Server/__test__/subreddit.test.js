const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

describe("SUBREDDIT", () => {
  describe("GET /frontpage-public", () => {
    it("respond with json containing a list of posts", async (done) => {
      request
        .get("/api/frontpage-public")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe("GET /r/test", () => {
    it("respond with the subreddit json", async  (done) => {
      request
        .get("/api/r/test")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe("GET /frontpage", () => {
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

    it("respond with json containing a list of posts", async  (done) => {
      request
        .get("/api/frontpage-public")
        .set("Authorization", "Bearer " + token)
        .expect(200, done);
    });
  });
  describe("POST /create-subreddit", () => {
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

    it("should failed because subreddit already exists", async  (done) => {
      request
        .post("/api/create-subreddit")
        .set("Authorization", "Bearer " + token)
        .send({ name: "test", description: "test" })
        .expect(409, done());
    });
  });
});
