let checkout = require('./Checkout');
let Cart = require('../models/Cart');
const { expect } = require('chai');

describe('Checkout', ()=> {

    it('should throw an error with an empty cart', ()=> {
        let car = new Cart();

        let callCheckout = ()=>{ checkout(null, cart)};
        expect(callCheckout).to.throw();
    })
})