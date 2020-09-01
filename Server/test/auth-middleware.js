const authMiddleware = require("../middlewares/is-auth");
const expect = require("chai").expect;

describe("Auth midleware", () => {
  it("throw error if there is no header", function () {
    const req = {
      get: function (headerName) {
        return null;
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("throw error if there the authorization header is only one string", function () {
    const req = {
      get: function (headerName) {
        return "xxxx";
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});

