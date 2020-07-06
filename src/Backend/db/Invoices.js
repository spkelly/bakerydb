module.exports = function(dbInstance) {
  let db = dbInstance.db();
  const counters = db.collection('counters');
  const invoiceCollection = db.collection("invoices");


  function createInvoice(){

  }


  function getInvoiceNumber(){
    let counter = counters.findAndModify({ref:'invoice_number'},{$inc:{seq:1}})
    return counter.seq
  }


  function addInvoice(){

  }

  return {
    createInvoice,
    addInvoice
  }
}