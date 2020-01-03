let calculateTax = require('../index').calculateTax;

describe('Helper Functions',()=>{
  describe('calculateTax()',()=>{
    it('should calculate the proper tax amount',()=>{
      let subtotal = 74.35;
      let expectedAmount = 5.76;
      let taxAmount = calculateTax(subtotal, .0775);
      expect(taxAmount).toEqual(expectedAmount);
    })
  })
})