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

**Example of using beforeEach**
This code could be replaced since I use the declaration of cart and myPart in both tests:
```js script
describe("Cart", () => {

  describe("addItem", () => {

    it("should have only 1 item with a qty of 1 after addItem is called on a fresh cart with a qty of 1", () => {
      const cart = new Cart();
      const myPart = {};

      cart.addItem(myPart, 1);

      expect(cart.lineItems.length).to.equal(1);
      expect(cart.lineItems[0].quantity).to.equal(1);
    });

    it("should have only 1 item with a qty of 1 after addItem is called on a fresh cart with a qty of 1", () => {
        const cart = new Cart();
        const myPart = {};
  
        cart.addItem(myPart, 1);
        cart.addItem(myPart, 1);
  
        expect(cart.lineItems.length).to.equal(1);
        expect(cart.lineItems[0].quantity).to.equal(2);
      });
  });
});
```
Using *beforeEach*:

```js script
describe("Cart", () => {

  describe("addItem", () => {
    let cart, myPart;

    beforeEach(()=>{
        cart = new Cart();
        myPart = {};
    })

    it("should have only 1 item with a qty of 1 after addItem is called on a fresh cart with a qty of 1", () => {

        cart.addItem(myPart, 1);

        expect(cart.lineItems.length).to.equal(1);
        expect(cart.lineItems[0].quantity).to.equal(1);
    });

    it("should have only 1 item with a qty of 1 after addItem is called on a fresh cart with a qty of 1", () => {
      .
      .
      .
  ```
  Never initialize a variable outside the beforeEach. Always do the initialization inside of the beforeEach or your it functions.

  **<font size="5"> Effectively Testing Production Code</font>**

**Boundary testing**
Is a way to assure that the code works when you hit natural boundaries in the parameters that are involved in a piece of code, and look at how we might test those boundaries.
There are probably three natural boundaries that we might want to consider.
* **No items** (nothing, 0, etc): What if we have no items tin the cart? The algorithm for summing up the items and printing them out may or not work if there´s no items in the cart because the programmer may or may not have considered that scenario.

* **1 item**: The algorithm to sum up and display the total cost of a list of just one item might have been written differently than for multiple items.

* **Multiple items**

Normally a good rule of thumb is the nuber of branches in a line of code are the number of tests that you might want to write. But getTotalCost actually has no branching and yet by looking at the boundaries, we´ve come up with three scenarios that would be good scenarios to write for our test.

```js script
// Sums up the costs and quantities of the items that are in the cart and adds them all into a single number.
getTotalCost() {
        return this.lineItems.reduce((p, c) => {
            return p + c.part.cost * c.quantity;
        }, 0);
    }

describe("getTotalCost", () => {
    let cart;

    beforeEach('getTotalCost', ()=> {
        cart = new Cart();        
    })

    it('should be 0 with no items', ()=>{
        expect(cart.getTotalCost()).to.equal(0);
    })

    it('should be 5 with one item with a qty of 1 and cost of 5', ()=>{
        let myPart1 = {cost: 5};
        cart.addItem(myPart1, 1);

        expect(cart.getTotalCost()).to.equal(5);
    })

    it('should be 15 with one item with a qty cost of 5, and another item qty 1, cost 10', ()=>{
        let myPart1 = {cost: 5};
        let myPart2 = {cost: 10};
        cart.addItem(myPart1, 1);
        cart.addItem(myPart2, 1);

        expect(cart.getTotalCost()).to.equal(15);
    })
})
  ```

**Parameterized Tests**
In the last test we can see that each of these tests is a variation of the same thing with two different parameters: one parameter is what does the lineItems array look like ant the other parameter is what should the total cost be when you call getTotalCost?.

In the first test, it´s 0 item in the array and a total cost of 0, in the second scenario it´s 1 item in the array with a quantity of 1, cost of 5 and a total cost of 5.

Because of that we could theoretically codify these variations into a single array.

```js script
 describe("getTotalCost variations", () => {
        let partCost5 = {cost: 5};
        let partCost10 = {cost: 10};
        let emptyLineItems = [];
        let singleItemLineItems = [{part: partCost5, quantity: 1}]
        let multipleLineItems = [{part: partCost5, quantity: 1}, {part: partCost10, quantity: 1}]
    
        let testVariations = [
            {lineItems: emptyLineItems, expected: 0},
            {lineItems: singleItemLineItems, expected: 5},
            {lineItems: multipleLineItems, expected: 15},
        ];
    
        testVariations.forEach( test=> {
            it(`correctly calculates the total cost with ${test.lineItems.length} items`, ()=>{
                cart.lineItems = test.lineItems;
                expect(cart.getTotalCost()).to.equal(test.expected);
            })
        })
    
      })
```

The equal matcher operator checks that the item that is inside of the equal function is the same as the item that´s in the expect function. For primitive values, it doesn´t matter, a three and a three compare the same, but **for items with identity comparisons** such as arrays and objects, this becomes simply an identity comparison, and it checks that the **item** is exactly the same item.

But sometimes you want to know if the item has the right shape. For exampple, an object has certain number of properties, each with a certain value, but we don´t necessarily want to compare identity.

With equal we see that the error says it is expecting an empty array to equal an empty array. It is doing an identity comparison.

```js script
it('should be 0 with no items', () => {
      let empty = [];
      
      cart.lineItems = [{}, {}];

      cart.empty();

      expect(cart.lineItems).to.equal(empty);
    })

 AssertionError: expected [] to equal []
      + expected - actual
```
**eql** function is a deep comparison operator. Whe you pass eql an object or an array, it will look inside that object or array and make sure that its shape is the same as the shape of the object or array that we passed into the expect funciton.

This gives us the opportunity  to compare just *the shapes of object rather than the identity of the objects.*
We want the shape to be similar, we don´t want them to be the exact same instance of the object, but we want them both to be empty arrays.
```js script

 it('should be 0 with no items', () => {
      let empty = [];
      
      cart.lineItems = [{}, {}];

      cart.empty();

      expect(cart.lineItems).to.eql(empty);
    })

     should have empty array
      ✔ should be 0 with no items
```

Optimizing the test with eql:

```js script
  it("should have only 1 item with a qty of 1 after addItem is called on a fresh cart with a qty of 1", () => {

      cart.addItem(myPart, 1);
      //expect(cart.lineItems.length).to.equal(1);
      //expect(cart.lineItems[0].quantity).to.equal(1);
      expect(cart.lineItems).to.eql([{part:{}, quantity:1}])
    });

```

**Testing identity**
In this test, we are checking that they are different objects.
As you see, in this method we are assigning a brand new object
```js script
empty() {
        this.lineItems = []
    }
```
We want to make sure that when we clean out the lineItems, that we actually are assigning a brand new object to the lineItems property and we don´t have the same object anymore.
Even though the shapes are identical, they were both empty arrays. We are now checking that they are different objects.


  **<font size="5">Testing async code, Promises and Test Coverage</font>**

**Callbacks**
```js script
  module.exports = (cart, cb) => {
    // send cart info to server
    setTimeout(() => {
      // notify that order was success
        cb(true)
    }, 500)
}

it('should call the callback with a true vale', ()=> {
        let cart = {};
        let  success;

        let cb = (p1)=>{
            success = p1; // it isn´t getting called inmediately, so it´s getting skipped.
        }

        order(cart, cb)

        expect(success).to.be.true; // it would be undefined because it skipped the callback
    })
```

The "right" way to test it would be:

```js script
it('should call the callback with a true vale', ()=> {
        let cart = {};
        let  success;

        let cb = (p1)=>{
            success = p1;
            expect(success).to.be.true;
        }

        order(cart, cb)

    })
```

But there is a problem. We aren´t making sure that the callback was ever called, and so that expect statement which is inside of the callback, doesn´t necessarily have to be run and therefore the test might be showing passing, because it´s never actually running our assertion portion.

Mocha helps us with this asynchronous code with the **done** parameter.

Mocha will know once we accpet this parameter, that this is anasyncrhonous test, and therefore it will fail the test if that done parameter isn´t called.

```js script
it('should call the callback with a true vale', (done)=> {
        let cart = {};
        let  success;

        let cb = (p1)=>{
            success = p1;
            expect(success).to.be.true;
            done()                       // call done parameter
        }

        order(cart, cb)

    })
```

**Promises**
A promise testing should have a return and use the .then().

The following code is not actually passing the test. If I change the 500 to 600 in the code it will still work or I delete the line of resolve or change it by reject it will pass the test. It would be a false positive.

The done parameter can´t be used here, it will throw a Timeout.
```js script
module.exports = (cart) => {
    let p = new Promise((resolve, reject)=> {
        resolve(500)
    })
    return p;
}


it('should deal with promises', ()=> {
  let cart = {};

  order(cart).then(total => {
    expect(total).to.equal(500);
  })
})
```

What we need to do is to return the promise
```js script
it('should deal with promises', ()=> {
  let cart = {};

  return order(cart).then(total => {
    expect(total).to.equal(500);
  })
})
```

**Testing Thrown Errors**

The way that Mocha works is if an exception is thrown inside of a test then Mocha considers that to be a failing test so what we want to dp is tell Mocha "this is what we want".
So we wrap the checkout function inside of its own function and we don´t invoke it, we only pass it in the expect. Mocha detects that that was a function that I gave it, and it´s going to call it on its own.

```js script
it('should deal with promises', ()=> {
  let cart = {};

  let callCheckout = ()=>{ checkout(null, cart)};
  expect(callCheckout).to.throw();
  })
})
```

**Test Coverage**
It tells me what code in the project has been covered by unit tests and what hasn´t.
```js script
npm i -D nyc

```
In the package.json add the following in the scripts:
```js script
  "coverage": "nyc npm run test"
```
Run it with:
```js script
npm run coverage


File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------|---------|----------|---------|---------|-------------------
All files           |   83.81 |       40 |   78.57 |   83.62 | 
 app                |   77.41 |      100 |   63.63 |   77.41 | 
  display.js        |   36.36 |      100 |       0 |   36.36 | 8-27
  order.js          |     100 |      100 |     100 |     100 | 
  order.spec.js     |     100 |      100 |     100 |     100 | 
  part.spec.js      |     100 |      100 |     100 |     100 | 
  parts.js          |     100 |      100 |     100 |     100 | 
 app/commands       |   69.81 |       25 |   78.57 |   69.23 | 
  Checkout.js       |   26.66 |        0 |       0 |   26.66 | 6-22
  checkout.spec.js  |     100 |      100 |     100 |     100 | 
  utilities.js      |   54.54 |       50 |      50 |   54.54 | 5-10
  utilities.spec.js |     100 |      100 |     100 |     100 | 
 app/models         |   94.38 |      100 |   83.87 |   94.31 | 
  Cart.js           |   78.57 |      100 |   66.66 |   76.92 | 26-31
  Part.js           |   77.77 |      100 |   33.33 |   77.77 | 19-23
  cart.spec.js      |     100 |      100 |     100 |     100 | 
--------------------|---------|----------|---------|---------|-------------------
```

Since Mocha is configured in watch mode, you have to terminate the process to see the coverage.

To tell istanbul don´t report on our spec files:
1. Create a file .nycrc
```js script
{
  "all": true,
  "include": [
    "app/**/*.js"
  ],
  "exclude": [
    "**/*.spec.js"
  ]
}
```