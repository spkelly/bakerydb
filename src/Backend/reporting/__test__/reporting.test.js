import { ExcelCreator, InvoiceCreator } from ".."


let testOrder = {
  _id: '10000',
  customer: {
    name: 'Sean'
  }
}

describe('Reporting', ()=>{
  describe('InvoiceCreator', ()=>{
    it('should require a fileName', ()=>{
      let testCreator = new InvoiceCreator(testOrder);
    });
    
    it('should require an order object', ()=>{})
    it('should set a proper template path', ()=>{
      let testSheet = new ExcelCreator(testOrder);
      
    })
    it('should set a proper save path', ()=>{})
  })
  describe('InvoiceCreator', ()=>{})
  describe('ReportCreator', ()=>{})
})