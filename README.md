**Node.js with Mocha**
used Node.js version 12 and npm version 6.9.0.

**<font size="5"> Fundamentals of Mocha</font>**
**1.** Install, configure and run Mocha:

  ```js script 
 npm i mocha

 npx mocha // Executes mocha within the app and Mocha will run with its default configuration.
 // The best way is to set up a test command in the package.json.

 // Change the following:
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // By:
"scripts": {
    "test": "mocha"
  },

  npm test // This will run mocha. It´s the same as npx mocha

  // If you want to keep mocha running and checking the changes add --watch
"scripts": {
    "test": "mocha --watch"
  },

  // To specify the folder you want to run the tests, add:

   "scripts": {
    "test": "mocha './app/**/*.spec.js' --watch"
  },
  ```
To configure Mocha there are many options:
- .mocharc.js / .cjs
- .mocharc.yaml / .yml
- .mocharc.json / .jsonc
- mocha section in package.json

One option is to create a file named .mocharc.json:

 ```js script 
 {
    "watch": true
}
  ```

  Another option is to set the options in the package.json:
 ```js script 
 "mocha":{
    "watch": true
  },
  ```

**2.** Mocha Syntax:

  ```js script 
  // This function takes in two parameters: A string for the description and the second is a callback function.
  // It is used for grouping tests together.
  
 


describe('parts', ( )=>{
     // It can also be used to create subgroups by nesting describe function
    describe('add method', () => {
        
        // it function represents an actual test.
        // Describes what should happen
        // Starts with the word should
        // Append with describe to specify functionality
        it('should add a part to the parts list', ()=> {

        })

         it('should not add duplicate parts', ()=> {

        })

    })

    describe('remove method', () => {

    })
})
  ```


**2.** Passing and failing tests:

  ```js script 
    describe('some tests', () => {

        it('should pass', () => {

        })

        it('should pass', () => {
            throw new Error('a failed test')
        })
    })

    // I should see in the console the following:
    > Nodejs-with-Mocha@1.0.0 test C:\Users\scardenas\Documents\Own projects\Nodejs-with-Mocha
    > mocha



    some tests
     ✔ should be true


    1 passing (7ms)
  ```

  Now passing and failing test 

  ```js script 
    describe('some tests', () => {

        it('should pass', () => {

        })

        it('should pass', () => {
            throw new Error('a failed test')
        })
    })

     some tests
    ✔ should be true
    1) should pass


    1 passing (10ms)
    1 failing

    1) some tests
       should pass:
     Error: a failed test
      at Context.<anonymous> (test\test.js:8:15)
      at processImmediate (internal/timers.js:461:21)
    
  ```




  **<font size="5"> Chai and Hooks in Mocha</font>**

**1.** Chai is an assertion library. It allows you to do asserts. An assert is a question about our code. So assertion libraries allow us to easily ask questions about our code. If we have a function that returns a result we would like to know if the result is what we expect it to be.

Mocha is a tool only does part of the total job of running unit tests.
Mocha is the test runner that will execute and group together unit tests.

The other critical part is an assertion library.

The point of a unit test is to **have the system indicate if things went right**

https://www.chaijs.com/api/bdd/

  ```js script 
// D flag install in dev. It is the shortcut for --save-dev. Package will appear in your devDependencies
npm i -D chai

const expect = require('chai').expect;

describe('', () => {
    it('', () => {
        let result = true;

        //do something

        expect(result).to.be.true;
    })
})
// Run
npm test

  ✔ 


  1 passing (4ms)

ℹ [mocha] waiting for changes...

 AssertionError: expected false to be true
  ```
  If I change the result by false it will fail because it is expecting a true result.

  ```js script
  const expect = require('chai').expect;

  describe('', () => {
    it('', () => {
        let result = false;

        //do something

        expect(result).to.be.true;
    })
})


AssertionError: expected false to be true
      + expected - actual

      -false
      +true
  ```
Chi supports three total syntaxes
- Assert
- Expect
- Should

**expect**
```js script
  const expect = require('chai').expect;

  describe('', () => {
    it('', () => {
        let result = true;

        //do something

        expect(result).to.be.true;
    })
})
```

**should**
```js script
  const should = require('chai').should(); // Modify the protoypes of all of the basic types of primitives inside Javascript.
  
  describe('', () => {
    it('', () => {
        let result = false;

        //do something

        result.should.be.false;
    })
})
```

**assert**
```js script
 const assert = require('chai').assert;
  
  describe('', () => {
    it('', () => {
        let result = false;

        //do something

        assert.isTrue(result);
    })
})
```

**Unit Testing Best Practices**

Use **AAA** structure inside of our tests:
- **Arrange** the test itself, we arrange any preconditions, any setups.
- **Act** we take our action, we do something in the test, make something happen.
- **Assert** we assert that the expected result happened.

Another best practice is to test only one state in each test. So we test the inital state in one test and the final state in another test.
- Use only one "logical" assertion.
- Test should have only one reason to fail.

Never use branching inside your tests. Always write a test for one specific condition.
```js script
// Function to test
 getArgument: (line, index) => {
        let words = line.split(' ');
        if(words.length > index) {
            return words[index]
        } else {
            return undefined;
        }
    }

it("should return undefined when asked for a parameter from a string with only one word", () => {
  // arrange

  
  // act
    let secondArg = utilities.getArgument("command", 2);
  
  // assert
    chai.expect(secondArg).to.be.undefined;
      });
// test


```


**Mocha Reports**

Adding the option "reporter" will adjust the terminal window to show us some logs.
The spec is the default option which show us the description of each test and the number of tests completed.

```js script
.....
 "mocha": {
    "watch": true,
    "reporter":"dot"
  }

  // Console result
  5 passing (24ms)


// With nyan
"mocha": {
    "watch": true,
    "reporter":"nyan"
  }

  // Console result
   5   -_-_-__,------,  
 0   -_-_-__|  /\_/\  
 0   -_-_-_~|_( ^ .^) 
     -_-_-_ ""  ""    

  5 passing (23ms)

  // With landing
"mocha": {
    "watch": true,
    "reporter":"landing"
  }

  --------------------------------------------------------------------------------------------------------------------- 
  ⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅✈
  --------------------------------------------------------------------------------------------------------------------- 

  5 passing (7ms)

```

**Executing Subsets of Tests**

- only: Only executes this test
- skip: Skip this test
  This options can be set in it and describe as well.

```js script
describe.skip('', ()=>{ 
  ...
})

describe.skip('', ()=>{ 
     it.skip('', ()=>{ 
          ...
       })
}

describe('', ()=>{
  it.only('', ()=>{ 
          ...
       })
 })

```


**Mocha Hooks**
Mocha has the ability to run setup and teardown code before and after executing tests with the following lifetime hooks:
- before
- beforeEach
- after
- afterEach

*beforeEach*
Executes once before every test.

*afterEach*
Executes once after every test
```js script
describe("utilities", () => {

  beforeEach(()=>{
    console.log('before each')
  })

  afterEach(()=>{
    console.log('before each')
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

// Console result
        utilities
        getArgument
    before each
          ✔ should return the second word when asked for the first parameter
    after each
    before each
          ✔ should return the third word when asked for the second parameter
    after each
    before each
          ✔ should return undefined when asked for a parameter that doesn´t exist
    after each
    before each
          ✔ should return undefined when asked for a parameter from a string with only one word
    after each


    ✔ 


  5 passing (16ms)
```

*beforeEach*
Will execute only once before all the tests execute.

*after*
Executes once after all the tests have executed.

```js script
utilities
    getArgument
      ✔ should return the second word when asked for the first parameter
      ✔ should return the third word when asked for the second parameter
      ✔ should return undefined when asked for a parameter that doesn´t exist
      ✔ should return undefined when asked for a parameter from a string with only one word
after 
```

  **<font size="5"> Effectively Testing Production Code</font>**