const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

describe("ACCOUNT", () => {
  describe("GET /api/u/test", () => {
    it("respond with test account profile ", async (done) => {
      request
        .get("/api/api/u/:username")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done());
    });
  });

  describe("PUT /api/u/suscribe/:subreddit", () => {
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

    it("should failed subreddit dont exists ", (done) => {
      request
        .put("/api/u/suscribe/:dontextsts")
        .set("Authorization", "Bearer " + token)
        .expect(409, done);
    });
  });

  describe("PUT /api/u/unsuscribe/:subreddit", () => {
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

    it("should failed subreddit dont exists ", (done) => {
      request
        .put("/api/u/suscribe/:dontextsts")
        .set("Authorization", "Bearer " + token)
        .expect(409, done);
    });
  });

  describe("GET /api/u/:username/:subreddit", () => {
    it("should failed subreddit dont exists ", (done) => {
      request.get("/api/u/test/test").expect(200, done);
    });
  });
});
