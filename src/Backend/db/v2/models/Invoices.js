const mongoose = require("mongoose");
const Order = require('./Order');
const Schema = mongoose.Schema;

const InvoiceRevisionSchema = Schema({
  revisionDate: Date,
  revisionPath: String,
  revisionData:{
    orderRowInfo:[Object],
  }
})


const InvoiceSchema = Schema({
  invoiceNumber:Number, 
  revisions:[InvoiceRevisionSchema]
});

let Invoice = mongoose.model('invoice',InvoiceSchema);


function getInvoiceNumber(){};

async function createInvoice(orderId, data){
  let iNumber = await getInvoiceNumber();
  let dataToSave = {
    invoiceNumber: iNumber,
    revisions: [data]
  }
  
  let doc = new Invoice(dataToSave);
  let ref = await doc.save();
  let stringifedInvoiceId = ref._id.toString();
  let test =  await Order.updateOrder(orderId,{invoiceRef:stringifedInvoiceId});
  return stringifedInvoiceId;
}

function getInvoice(id){
  return Invoice.findById(id)
}

function addRevision(id, data){
  return Invoice.findByIdAndUpdate(id,{
    $push:{revisions:data}
  },{new:true});
}

function getRevisions(id){

}



module.exports = {
  createInvoice,
  getInvoice,
  addRevision,
  getRevisions,
  _model: Invoice
}

