let order = require("./order");
let { expect } = require("chai");

describe("order", () => {
  it("should call the callback with a true vale", (done) => {
    let cart = {};
    let success;

    let cb = (p1) => {
      success = p1;
      expect(success).to.be.true;
      done();   
    };

    order(cart, cb);
  });
});
