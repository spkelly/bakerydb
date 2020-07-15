const mongoose = require("mongoose");
const Order = require('./Order');
const Schema = mongoose.Schema;
const Counter = require("./Sequence");
const padStart = require("string.prototype.padstart");
const { handleError } = require("../../../error.js");
const InvoiceRevisionSchema = Schema({
  revisionDate: Date,
  revisionPath: String,
  revisionData:{
    orderRowInfo:[Object],
  }
})


const InvoiceSchema = Schema({
  invoiceNumber:{type:String, unique:true}, 
  revisions:[InvoiceRevisionSchema]
});

let Invoice = mongoose.model('invoice',InvoiceSchema);


async function getInvoiceNumber(){
  let seqNumber = await Counter.getValueAndUpdate();
  return '2020-' + padStart(seqNumber.seq.toString(),8,'0');
};

async function createInvoice(orderId, data){
  let iNumber = await getInvoiceNumber();
  let dataToSave = {
    invoiceNumber: iNumber,
    revisions: [data]
  }
  
  let doc = new Invoice(dataToSave);
  let ref = await doc.save();
  let stringifedInvoiceId = ref._id.toString();
  await Order.updateOrder(orderId,{invoiceRef:stringifedInvoiceId}).catch(handleError);
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
  _getInvoiceNumber: getInvoiceNumber,
  _model: Invoice
}

