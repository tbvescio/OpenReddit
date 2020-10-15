const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

describe("SEARCH", () => {
  describe("GET /search", () => {
    it("respond with json containing a post and accounts ", async (done) => {
      request
        .get("/api/search?query=test")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done());
    });
  });
});
