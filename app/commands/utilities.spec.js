const chai = require("chai");
const utilities = require("./utilities.js");

describe("utilities", () => {

      after(()=>{
        console.log('after each')
      })
  describe("getArgument", () => {
    it("should return the second word when asked for the first parameter", () => {
      let firstArg = utilities.getArgument("command argument", 1);

      chai.expect(firstArg).to.equal("argument");
    });

    it("should return the third word when asked for the second parameter", () => {
      let secondArg = utilities.getArgument("command argument1 argument2", 2);

      chai.expect(secondArg).to.equal("argument2");
    });

    it("should return undefined when asked for a parameter that doesn´t exist", () => {
      let thirdArg = utilities.getArgument("command argument1 argument2", 3);

      chai.expect(thirdArg).to.be.undefined;
    });

    it("should return undefined when asked for a parameter from a string with only one word", () => {
        let secondArg = utilities.getArgument("command", 2);
  
        chai.expect(secondArg).to.be.undefined;
      });
  });
});
