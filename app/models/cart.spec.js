const Cart = require("./Cart");
const { expect } = require("chai");

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

    it("should have only 1 item with a qty of 2 after addItem is called twice on a fresh cart with a qty of 1", () => {

        cart.addItem(myPart, 1);
        cart.addItem(myPart, 1);
  
        expect(cart.lineItems.length).to.equal(1);
        expect(cart.lineItems[0].quantity).to.equal(2);
      });

      it('should add quantities together when addItem is called', ()=>{
        cart.addItem(myPart, 2);
        cart.addItem(myPart, 4);
  
        expect(cart.lineItems.length).to.equal(1);
        expect(cart.lineItems[0].quantity).to.equal(6);
      })

      it('should add items to the correct existing item', ()=>{
        let myPart2 = {}
        cart.addItem(myPart, 1);
        cart.addItem(myPart2, 1);
        cart.addItem(myPart, 3);
  
        expect(cart.lineItems.length).to.equal(2);
        expect(cart.lineItems[0].quantity).to.equal(4);
      })
  });

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
  })

  describe("should have empty array", () => {
    let cart;

    beforeEach('getTotalCost', ()=> {
        cart = new Cart();        
    })

    it('should be 0 with no items', () => {
      let empty = [];
      
      cart.lineItems = [{}, {}];

      cart.empty();

      expect(cart.lineItems).to.eql(empty);
    })

    it('should have a different object when emptied than the original array', () => {
      let originalLineItems = cart.lineItems;

      cart.empty();

      expect(cart.lineItems).not.equal(originalLineItems);
    })

  
  })
   
})
